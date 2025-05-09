import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

const FinancialRunwayChart = ({ currentCash, burnRate }) => {
    const runwayMonths = Math.floor(currentCash / burnRate);
    const isHealthy = runwayMonths >= 6;
    const chartColor = isHealthy ? "#10B981" : "#EF4444";

    // Simulação de dados para o gráfico
    const data = Array.from({ length: 12 }, (_, i) => ({
        month: `Mês ${i + 1}`,
        saldo: currentCash - (burnRate * (i + 1))
    }));

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Runway Financeiro</h2>
                <span className={`text-lg font-semibold ${isHealthy ? 'text-green-400' : 'text-red-400'}`}>
                    {runwayMonths} meses de caixa
                </span>
            </div>

            <div className='w-full h-80'>
                <ResponsiveContainer>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey='month' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Area type='monotone' dataKey='saldo' stroke={chartColor} fill={chartColor} fillOpacity={0.3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default FinancialRunwayChart;