import React, { ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';
import LoginForm from '../components/LoginForm';

interface ProtectedRouteProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    fallback = <LoginForm />
}) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}; 