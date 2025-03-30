import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { differenceInDays, format, parseISO } from 'date-fns';
import { Scale, TrendingDown, Target, Pencil, Trash2, Ruler } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { weights } from '../services/api';

interface WeightEntry {
    date: string;
    weight: number;
}

const Dashboard: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
    const [currentWeight, setCurrentWeight] = useState('');
    const [editingEntry, setEditingEntry] = useState<WeightEntry | null>(null);
    const [height, setHeight] = useState(user?.height || '');

    const TARGET_DATE = new Date('2025-06-30');
    const INITIAL_WEIGHT = 154;
    const TARGET_WEIGHT = 134;

    useEffect(() => {
        fetchWeights();
    }, []);

    const fetchWeights = async () => {
        try {
            const data = await weights.getAll();
            setWeightEntries(data);
        } catch (error) {
            console.error('Erro ao buscar pesos:', error);
        }
    };

    const calculateBMI = (weight: number) => {
        const userHeight = Number(height);
        if (!userHeight || userHeight <= 0) return null;
        const bmi = weight / (userHeight * userHeight);
        return bmi.toFixed(1);
    };

    const getBMICategory = (bmi: number) => {
        if (bmi < 18.5) return 'Abaixo do peso';
        if (bmi < 24.9) return 'Peso normal';
        if (bmi < 29.9) return 'Sobrepeso';
        if (bmi < 34.9) return 'Obesidade grau 1';
        if (bmi < 39.9) return 'Obesidade grau 2';
        return 'Obesidade grau 3';
    };

    const daysRemaining = differenceInDays(TARGET_DATE, new Date());
    const latestWeight = weightEntries.length > 0
        ? weightEntries[weightEntries.length - 1].weight
        : INITIAL_WEIGHT;
    const totalWeightLoss = INITIAL_WEIGHT - latestWeight;
    const remainingWeight = latestWeight - TARGET_WEIGHT;
    const currentBMI = calculateBMI(latestWeight);
    const bmiCategory = currentBMI ? getBMICategory(parseFloat(currentBMI)) : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentWeight) return;

        try {
            if (editingEntry) {
                // TODO: Implementar atualização
                setEditingEntry(null);
            } else {
                await weights.create(parseFloat(currentWeight), new Date().toISOString());
                await fetchWeights();
            }
            setCurrentWeight('');
        } catch (error) {
            console.error('Erro ao salvar peso:', error);
        }
    };

    const handleEdit = (entry: WeightEntry) => {
        setEditingEntry(entry);
        setCurrentWeight(entry.weight.toString());
    };

    const handleDelete = async (date: string) => {
        // TODO: Implementar deleção
        if (editingEntry?.date === date) {
            setEditingEntry(null);
            setCurrentWeight('');
        }
    };

    const sortedEntries = [...weightEntries].sort((a, b) =>
        parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );

    const chartData = {
        labels: sortedEntries.map(entry => format(parseISO(entry.date), 'dd/MM')),
        datasets: [
            {
                label: 'Progresso de Peso',
                data: sortedEntries.map(entry => entry.weight),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Progresso de Perda de Peso'
            }
        },
        scales: {
            y: {
                min: TARGET_WEIGHT - 5,
                max: INITIAL_WEIGHT + 5
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Target className="w-8 h-8 text-blue-600" />
                    Jornada de Perda de Peso
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Scale className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold">Dias Restantes</h2>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{daysRemaining}</p>
                        <p className="text-sm text-gray-600">Até 30 de Junho, 2025</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-semibold">Progresso Total</h2>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{totalWeightLoss.toFixed(1)} kg</p>
                        <p className="text-sm text-gray-600">Perdido até agora</p>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            <h2 className="text-lg font-semibold">Restante</h2>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">{remainingWeight.toFixed(1)} kg</p>
                        <p className="text-sm text-gray-600">Para atingir a meta</p>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Ruler className="w-5 h-5 text-orange-600" />
                            <h2 className="text-lg font-semibold">IMC Atual</h2>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{currentBMI || '--'}</p>
                        <p className="text-sm text-gray-600">{bmiCategory || 'Altura não definida'}</p>
                    </div>
                </div>

                {isAuthenticated && (
                    <form onSubmit={handleSubmit} className="mb-8">
                        <div className="flex gap-4">
                            <input
                                type="number"
                                step="0.1"
                                value={currentWeight}
                                onChange={(e) => setCurrentWeight(e.target.value)}
                                placeholder="Digite o peso de hoje"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {editingEntry ? 'Atualizar Peso' : 'Registrar Peso'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="bg-white rounded-lg p-4 mb-8">
                    <Line data={chartData} options={chartOptions} />
                </div>

                <div className="bg-white rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Histórico de Peso</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peso (kg)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IMC</th>
                                    {isAuthenticated && (
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedEntries.map((entry) => (
                                    <tr key={entry.date} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {format(parseISO(entry.date), 'dd/MM/yyyy')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {entry.weight.toFixed(1)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {calculateBMI(entry.weight) || '--'}
                                        </td>
                                        {isAuthenticated && (
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(entry)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(entry.date)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 