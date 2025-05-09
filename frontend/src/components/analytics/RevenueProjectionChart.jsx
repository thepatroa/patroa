import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const RevenueProjectionChart = ({ currentRevenue, growthRate, months = 12 }) => {
    // Gerando dados de projeção de receita
    const pastData = Array.from({ length: months }, (_, i) => {
        const monthLabel = months - i === 1 ? "-1 Mês" : `-${months - i} Meses`;
        return {
            period: monthLabel,
            receita: Math.round(currentRevenue * Math.pow(1 + growthRate / 100, -(months - i)))
        };
    });

    const futureData = [{
        period: "+1 Mês",
        receita: Math.round(currentRevenue * Math.pow(1 + growthRate / 100, 1))
    }];

    const data = [...pastData, ...futureData];

    // Determinando a cor do gráfico com base na taxa de crescimento
    const isPositive = growthRate >= 0;
    const lineColor = isPositive ? "#10B981" : "#EF4444";

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Projeção de Receita Futura</h2>
                <span className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {growthRate}% ao mês
                </span>
            </div>

            <div className='w-full h-80'>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey='period' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Line type='monotone' dataKey='receita' stroke={lineColor} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RevenueProjectionChart;