import { motion } from "framer-motion";
import React from "react";

const LifetimeValueCard = ({ ltv, averageRevenue, averageLifespan }) => {
    const isHealthy = ltv >= 10000;
    const cardColor = isHealthy ? "bg-green-500" : "bg-red-500";

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
        >
            <div className='flex flex-col items-center'>
                <h2 className='text-xl font-semibold text-gray-100 mb-4'>Lifetime Value (LTV)</h2>
                <div className='relative w-full h-40 mb-6 bg-gray-700 rounded-lg overflow-hidden shadow-lg'>
                    <div className={`absolute inset-0 ${cardColor} opacity-80 rounded-lg`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}></div>
                    <div className='relative z-10 flex flex-col items-center justify-center h-full text-white'>
                        <span className='text-4xl font-bold'>R${ltv.toLocaleString()}</span>
                        <span className='text-sm mt-2'>Receita Média x Longevidade Média</span>
                    </div>
                </div>
                <div className='w-full px-4'>
                    <div className='flex justify-between text-gray-400 text-lg mb-2'>
                        <span>Receita Média:</span>
                        <span>R${averageRevenue.toLocaleString()}</span>
                    </div>
                    <div className='flex justify-between text-gray-400 text-lg'>
                        <span>Longevidade Média:</span>
                        <span>{averageLifespan} meses</span>
                    </div>
                </div>
                <p className='text-gray-500 text-sm mt-4 text-center px-4'>
                    O Lifetime Value (LTV) é o valor total que um cliente gera para a empresa ao longo do seu relacionamento. Ele é calculado multiplicando a receita média pela longevidade média do cliente.
                </p>
            </div>
        </motion.div>
    );
};

export default LifetimeValueCard;
