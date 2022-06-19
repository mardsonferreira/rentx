import React, { ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

export interface AuthState {
    token: string;
    user: User;
}

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}
