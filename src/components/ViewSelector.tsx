import React from 'react';
import { Eye, Edit } from 'lucide-react';

interface ViewSelectorProps {
    onSelectView: (view: 'public' | 'login') => void;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ onSelectView }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Escolha um modo de visualização
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => onSelectView('public')}
                    className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <Eye className="w-12 h-12 text-blue-600 mb-3" />
                    <span className="text-lg font-medium text-gray-800">Modo Visitante</span>
                    <p className="text-sm text-gray-600 text-center mt-2">
                        Apenas visualize o progresso
                    </p>
                </button>

                <button
                    onClick={() => onSelectView('login')}
                    className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                    <Edit className="w-12 h-12 text-green-600 mb-3" />
                    <span className="text-lg font-medium text-gray-800">Modo Editor</span>
                    <p className="text-sm text-gray-600 text-center mt-2">
                        Faça login para editar o progresso
                    </p>
                </button>
            </div>
        </div>
    );
};

export default ViewSelector; 