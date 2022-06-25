import React, { createContext, useState, useContext, useEffect } from 'react';

import api from '../services/api';

import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

import {
    AuthContextData,
    AuthProviderProps,
    User,
    SignInCredentials,
} from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', {
                email,
                password,
            });

            const { token, user } = response.data;

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userCollection = database.get<ModelUser>('users');

            await database.write(async () => {
                const userCreated = await userCollection.create((newUser) => {
                    (newUser.user_id = user.id),
                        (newUser.name = user.name),
                        (newUser.email = user.email),
                        (newUser.driver_license = user.driver_license),
                        (newUser.avatar = user.avatar),
                        (newUser.token = token);
                });

                user.id = userCreated._raw.id;
            });

            setData({ ...user, token });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function signOut() {
        try {
            const userCollection = database.get<ModelUser>('users');
            await database.write(async () => {
                const userSelected = await userCollection.find(data.id);
                await userSelected.destroyPermanently();
            });

            setData({} as User);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async function updateUser(user: User) {
        try {
            const userCollection = database.get<ModelUser>('users');
            await database.write(async () => {
                const userSelected = await userCollection.find(user.id);
                await userSelected.update((userData) => {
                    (userData.name = user.name),
                        (userData.driver_license = user.driver_license),
                        (userData.avatar = user.avatar);
                });
            });

            setData(user);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    useEffect(() => {
        async function loadUserData() {
            const userCollection = database.get<ModelUser>('users');
            const response = await userCollection.query().fetch();

            if (response.length > 0) {
                const userData = response[0]._raw as unknown as User;
                api.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${userData.token}`;
                setData(userData);
                setLoading(false);
            }
        }

        loadUserData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                loading,
                signIn,
                signOut,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
