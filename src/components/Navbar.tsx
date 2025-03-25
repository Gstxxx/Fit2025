import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Scale, LogOut, ArrowLeft } from 'lucide-react';

interface NavbarProps {
    currentView?: 'login' | 'editor' | 'public';
    onBackToSelector?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onBackToSelector }) => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="bg-white shadow-md fixed w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {(currentView === 'login' || currentView === 'public' || currentView === 'editor') && onBackToSelector && (
                            <button
                                onClick={onBackToSelector}
                                className="mr-2 p-2 rounded-full hover:bg-gray-100"
                                aria-label="Voltar"
                            >
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </button>
                        )}
                        <Scale className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-xl font-bold text-gray-800">Controle de Peso</span>

                        {currentView === 'public' && (
                            <span className="ml-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Modo Visitante
                            </span>
                        )}

                        {isAuthenticated && (
                            <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Modo Editor
                            </span>
                        )}
                    </div>

                    {isAuthenticated && (
                        <div className="flex items-center">
                            <button
                                onClick={logout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar; 