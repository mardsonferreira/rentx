import React, { createContext, useState, useContext } from 'react';

import api from '../services/api';

import {
    AuthContextData,
    AuthProviderProps,
    AuthState,
    SignInCredentials,
} from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthState>({} as AuthState);

    async function signIn({ email, password }: SignInCredentials) {
        console.log("AQUI")
        const response = await api.post('/sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setData({ token, user });
    }

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
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
