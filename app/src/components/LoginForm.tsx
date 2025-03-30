import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) {
            setError('Por favor, digite a senha');
            return;
        }

        const success = login(password);
        if (!success) {
            setError('Senha incorreta');
            setPassword('');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-blue-600" />
                Acesso ao Controle de Peso
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite a senha"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default LoginForm; 