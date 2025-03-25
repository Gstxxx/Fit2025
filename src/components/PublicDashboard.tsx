import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { differenceInDays, format, parseISO } from 'date-fns';
import { Scale, TrendingDown, Target, Activity } from 'lucide-react';
import { ChartArea } from 'chart.js';

interface WeightEntry {
    date: string;
    weight: number;
}

const PublicDashboard: React.FC = () => {
    const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);

    const INITIAL_DATE = new Date('2024-03-13');
    const TARGET_DATE = new Date('2025-06-30');
    const INITIAL_WEIGHT = 154.5;
    const TARGET_WEIGHT = 134;

    useEffect(() => {
        const saved = localStorage.getItem('weightEntries');
        let entries = [];

        if (saved) {
            entries = JSON.parse(saved);
        }

        const initialEntry = {
            date: '2024-03-13',
            weight: INITIAL_WEIGHT
        };

        if (entries.length === 0 || entries[0].date !== initialEntry.date) {
            entries = [initialEntry, ...entries];
            localStorage.setItem('weightEntries', JSON.stringify(entries));
        }

        setWeightEntries(entries);
    }, []);

    const totalDays = differenceInDays(TARGET_DATE, INITIAL_DATE);
    const daysRemaining = differenceInDays(TARGET_DATE, new Date());
    const daysPassed = totalDays - daysRemaining;

    const latestWeight = weightEntries.length > 0
        ? weightEntries[weightEntries.length - 1].weight
        : INITIAL_WEIGHT;

    const totalWeightLoss = INITIAL_WEIGHT - latestWeight;
    const remainingWeight = latestWeight - TARGET_WEIGHT;

    const progressPercentage = (totalWeightLoss / (INITIAL_WEIGHT - TARGET_WEIGHT)) * 100;

    const sortedEntries = [...weightEntries].sort((a, b) =>
        parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );

    const chartData = {
        labels: weightEntries.map(entry => format(parseISO(entry.date), 'dd/MM')),
        datasets: [
            {
                label: 'Progresso de Peso',
                data: weightEntries.map(entry => entry.weight),
                borderColor: 'rgba(0, 180, 216, 1)',
                backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D, chartArea?: ChartArea } }) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(0, 180, 216, 0.3)');
                    gradient.addColorStop(1, 'rgba(0, 180, 216, 0)');
                    return gradient;
                },
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#00b4d8',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#00b4d8',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 8
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        family: "'Poppins', sans-serif",
                        weight: 600,
                        size: 14
                    },
                    color: '#2b2d42',
                    usePointStyle: true,
                    padding: 20
                }
            },
            title: {
                display: true,
                text: 'Progresso de Perda de Peso',
                font: {
                    family: "'Poppins', sans-serif",
                    size: 20,
                    weight: 600
                },
                color: '#2b2d42',
                padding: {
                    bottom: 30
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#2b2d42',
                bodyColor: '#2b2d42',
                bodyFont: {
                    family: "'Poppins', sans-serif",
                    weight: 500
                },
                titleFont: {
                    family: "'Poppins', sans-serif",
                    weight: 600
                },
                borderColor: 'rgba(0, 180, 216, 0.3)',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function (context: any) {
                        return `Peso: ${context.parsed.y} kg`;
                    }
                }
            }
        },
        scales: {
            y: {
                min: TARGET_WEIGHT - 5,
                max: INITIAL_WEIGHT + 5,
                grid: {
                    color: 'rgba(0, 180, 216, 0.1)',
                    drawBorder: false
                },
                border: {
                    dash: [5, 5]
                },
                ticks: {
                    font: {
                        family: "'Poppins', sans-serif",
                        weight: 500,
                        size: 12
                    },
                    color: '#6c757d',
                    padding: 10,
                    callback: function (value: any) {
                        return value + ' kg';
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                border: {
                    dash: [5, 5]
                },
                ticks: {
                    font: {
                        family: "'Poppins', sans-serif",
                        weight: 500,
                        size: 12
                    },
                    color: '#6c757d',
                    padding: 10
                }
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="glassmorphism rounded-3xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-5xl font-bold gradient-text flex items-center gap-4 mb-3 shimmer">
                            <Activity className="w-12 h-12 animate-float" />
                            Jornada Fitness
                        </h1>
                        <p className="text-gray-600 text-xl font-light">Acompanhe minha transformação fitness</p>
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Modo Visitante
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="card-hover bg-white p-8 rounded-3xl shadow-sm border border-cyan-50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-cyan-50 p-3 rounded-2xl">
                                <Scale className="w-8 h-8 text-cyan-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Tempo</h2>
                        </div>
                        <p className="text-5xl font-bold stat-value mb-2">{daysRemaining}</p>
                        <p className="text-sm text-gray-500 font-medium">Dias Restantes</p>
                        <div className="mt-4 pt-4 border-t border-cyan-50">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Progresso:</span>
                                <span className="text-cyan-600 font-medium">{Math.round((daysPassed / totalDays) * 100)}%</span>
                            </div>
                            <div className="mt-2 h-2 bg-cyan-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                                    style={{ width: `${(daysPassed / totalDays) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-hover bg-white p-8 rounded-3xl shadow-sm border border-cyan-50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-cyan-50 p-3 rounded-2xl">
                                <TrendingDown className="w-8 h-8 text-cyan-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Progresso</h2>
                        </div>
                        <p className="text-5xl font-bold stat-value mb-2">{totalWeightLoss.toFixed(1)} kg</p>
                        <p className="text-sm text-gray-500 font-medium">Perdido até agora</p>
                        <div className="mt-4 pt-4 border-t border-cyan-50">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Meta:</span>
                                <span className="text-cyan-600 font-medium">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="mt-2 h-2 bg-cyan-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-hover bg-white p-8 rounded-3xl shadow-sm border border-cyan-50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-cyan-50 p-3 rounded-2xl">
                                <Target className="w-8 h-8 text-cyan-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Meta</h2>
                        </div>
                        <p className="text-5xl font-bold stat-value mb-2">{remainingWeight.toFixed(1)} kg</p>
                        <p className="text-sm text-gray-500 font-medium">Para atingir {TARGET_WEIGHT} kg</p>
                        <div className="mt-4 pt-4 border-t border-cyan-50">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Peso Atual:</span>
                                <span className="text-cyan-600 font-medium">{latestWeight.toFixed(1)} kg</span>
                            </div>
                            <div className="flex justify-between items-center text-sm mt-2">
                                <span className="text-gray-500">Peso Inicial:</span>
                                <span className="text-cyan-600 font-medium">{INITIAL_WEIGHT.toFixed(1)} kg</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 mb-12 shadow-sm border border-cyan-50 card-hover">
                    <Line data={chartData} options={chartOptions} className="min-h-[400px]" />
                </div>

                <div className="table-container">
                    <div className="p-8 border-b border-cyan-50">
                        <h2 className="text-2xl font-semibold text-gray-800">Histórico de Peso</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-cyan-50/50">
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-cyan-900 uppercase tracking-wider">
                                        Data
                                    </th>
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-cyan-900 uppercase tracking-wider">
                                        Peso (kg)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-cyan-50">
                                {sortedEntries.map((entry) => (
                                    <tr key={entry.date} className="table-row-hover">
                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-700">
                                            {format(parseISO(entry.date), 'dd/MM/yyyy')}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-cyan-600">
                                            {entry.weight.toFixed(1)}
                                        </td>
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

export default PublicDashboard; 