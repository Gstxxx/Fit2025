import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { AuthProvider } from '../auth/AuthContext';

vi.mock('../auth/AuthContext', () => {
    return {
        useAuth: () => ({
            isAuthenticated: true,
        }),
        AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
});

describe('Dashboard', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('weightEntries', JSON.stringify([
            { date: '2023-01-01', weight: 150 },
            { date: '2023-01-15', weight: 148 },
        ]));
    });

    it('deve renderizar o dashboard com dados existentes', () => {
        render(
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        );

        expect(screen.getByText('Jornada de Perda de Peso')).toBeInTheDocument();
        expect(screen.getByText('Dias Restantes')).toBeInTheDocument();
        expect(screen.getByText('Progresso Total')).toBeInTheDocument();
        expect(screen.getByText('Restante')).toBeInTheDocument();

        expect(screen.getByText('01/01/2023')).toBeInTheDocument();
        expect(screen.getByText('15/01/2023')).toBeInTheDocument();
    });

    it('deve adicionar um novo registro de peso', () => {
        render(
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        );

        const input = screen.getByPlaceholderText('Digite o peso de hoje');
        fireEvent.change(input, { target: { value: '145' } });
        fireEvent.click(screen.getByText('Registrar Peso'));

        const entries = JSON.parse(localStorage.getItem('weightEntries') || '[]');
        expect(entries.length).toBe(3);
        expect(entries[2].weight).toBe(145);
    });
}); 