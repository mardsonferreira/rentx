import React, { ReactNode } from 'react';

export interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}
