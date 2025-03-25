import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('deve mostrar a tela de seleção de visualização inicialmente', () => {
        render(<App />);
        expect(screen.getByText('Escolha um modo de visualização')).toBeInTheDocument();
        expect(screen.getByText('Modo Visitante')).toBeInTheDocument();
        expect(screen.getByText('Modo Editor')).toBeInTheDocument();
    });

    it('deve mostrar o dashboard público quando o modo visitante é selecionado', () => {
        render(<App />);

        fireEvent.click(screen.getByText('Modo Visitante'));

        expect(screen.getByText('Jornada de Perda de Peso')).toBeInTheDocument();
        expect(screen.getByText('Dias Restantes')).toBeInTheDocument();
        expect(screen.getByText('Modo Visitante')).toBeInTheDocument();
    });

    it('deve mostrar a tela de login quando o modo editor é selecionado', () => {
        render(<App />);

        fireEvent.click(screen.getByText('Modo Editor'));

        expect(screen.getByText('Acesso ao Controle de Peso')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha')).toBeInTheDocument();
        expect(screen.getByText('Entrar')).toBeInTheDocument();
    });

    it('deve mostrar o dashboard de editor após autenticação bem-sucedida', () => {
        render(<App />);

        fireEvent.click(screen.getByText('Modo Editor'));

        const passwordInput = screen.getByLabelText('Senha');
        fireEvent.change(passwordInput, { target: { value: '$Gustavo89fra' } });
        fireEvent.click(screen.getByText('Entrar'));

        expect(screen.getByText('Jornada de Perda de Peso')).toBeInTheDocument();
        expect(screen.getByText('Dias Restantes')).toBeInTheDocument();
        expect(screen.getByText('Registrar Peso')).toBeInTheDocument();
    });

    it('deve permitir voltar para o seletor de visualização', () => {
        render(<App />);

        fireEvent.click(screen.getByText('Modo Visitante'));

        fireEvent.click(screen.getByLabelText('Voltar'));

        expect(screen.getByText('Escolha um modo de visualização')).toBeInTheDocument();
    });
}); 