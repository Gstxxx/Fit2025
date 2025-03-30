import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicDashboard from '../components/PublicDashboard';

describe('PublicDashboard', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('weightEntries', JSON.stringify([
            { date: '2023-01-01', weight: 150 },
            { date: '2023-01-15', weight: 148 },
        ]));
    });

    it('deve renderizar o dashboard público com dados existentes', () => {
        render(<PublicDashboard />);

        expect(screen.getByText('Jornada de Perda de Peso')).toBeInTheDocument();
        expect(screen.getByText('Dias Restantes')).toBeInTheDocument();
        expect(screen.getByText('Progresso Total')).toBeInTheDocument();
        expect(screen.getByText('Restante')).toBeInTheDocument();
        expect(screen.getByText('Modo Visitante')).toBeInTheDocument();

        expect(screen.getByText('01/01/2023')).toBeInTheDocument();
        expect(screen.getByText('15/01/2023')).toBeInTheDocument();

        expect(screen.queryByText('Registrar Peso')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Digite o peso de hoje')).not.toBeInTheDocument();
    });

    it('deve exibir o dashboard público sem dados quando localStorage está vazio', () => {
        localStorage.clear();
        render(<PublicDashboard />);

        expect(screen.getByText('Jornada de Perda de Peso')).toBeInTheDocument();
        expect(screen.getByText('Dias Restantes')).toBeInTheDocument();
        expect(screen.getByText('Modo Visitante')).toBeInTheDocument();

        const tableRows = screen.queryAllByRole('row');
        expect(tableRows.length).toBe(1);
    });
}); 