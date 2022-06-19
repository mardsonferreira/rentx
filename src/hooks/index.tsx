import React from 'react';

import { AuthProvider } from './auth';

import { AuthProviderProps } from './types';

function AppProvider({ children }: AuthProviderProps) {
    return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
