import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Lock, User, Mail, Ruler } from 'lucide-react';

const LoginForm: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        height: '',
    });
    const [error, setError] = useState('');
    const { login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password || (isRegistering && (!formData.name || !formData.height))) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        if (isRegistering && (parseFloat(formData.height) <= 0 || parseFloat(formData.height) > 3)) {
            setError('Por favor, insira uma altura válida (em metros)');
            return;
        }

        try {
            const success = isRegistering
                ? await register(formData.name, formData.email, formData.password, parseFloat(formData.height))
                : await login(formData.email, formData.password);

            if (!success) {
                setError(isRegistering ? 'Erro ao registrar' : 'Email ou senha incorretos');
            }
        } catch (err) {
            setError('Erro ao processar a requisição');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-blue-600" />
                {isRegistering ? 'Criar Conta' : 'Acesso ao Controle de Peso'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nome
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Seu nome"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="height"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Altura (m)
                            </label>
                            <div className="relative">
                                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="number"
                                    id="height"
                                    step="0.01"
                                    min="0.5"
                                    max="3"
                                    value={formData.height}
                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: 1.75"
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="seu@email.com"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Senha
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Sua senha"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {isRegistering ? 'Registrar' : 'Entrar'}
                </button>

                <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800"
                >
                    {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm; 