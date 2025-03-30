import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    isAuthenticated: false,
    login: () => false,
    logout: () => { },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

const CORRECT_PASSWORD = '$Gustavo89fra';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    }, [isAuthenticated]);

    const login = (password: string): boolean => {
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 