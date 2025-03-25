import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from '../middleware/AuthMiddleware';

describe('AuthMiddleware', () => {
    it('deve renderizar o conteúdo protegido quando autenticado', () => {
        vi.mock('../auth/AuthContext', () => ({
            useAuth: () => ({
                isAuthenticated: true,
            }),
        }));

        render(
            <ProtectedRoute>
                <div>Conteúdo protegido</div>
            </ProtectedRoute>
        );

        expect(screen.getByText('Conteúdo protegido')).toBeInTheDocument();
    });

    it('deve renderizar o fallback quando não autenticado', () => {
        vi.mock('../auth/AuthContext', () => ({
            useAuth: () => ({
                isAuthenticated: false,
            }),
        }));

        render(
            <ProtectedRoute fallback={<div>Acesso negado</div>}>
                <div>Conteúdo protegido</div>
            </ProtectedRoute>
        );

        expect(screen.getByText('Acesso negado')).toBeInTheDocument();
        expect(screen.queryByText('Conteúdo protegido')).not.toBeInTheDocument();
    });
}); 