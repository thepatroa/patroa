import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const revenueData = [
	{ month: "Jan", bruto: 4000, liquido: 3800 },
	{ month: "Fev", bruto: 3000, liquido: 3200 },
	{ month: "Mar", bruto: 5000, liquido: 4500 },
	{ month: "Abr", bruto: 4500, liquido: 4200 },
	{ month: "Mai", bruto: 6000, liquido: 5500 },
	{ month: "Jun", bruto: 5500, liquido: 5800 },
	{ month: "Jul", bruto: 7000, liquido: 6500 },
	{ month: "Ago", bruto: 7000, liquido: 6500 },
	{ month: "Set", bruto: 7000, liquido: 6500 },
	{ month: "Out", bruto: 7000, liquido: 3200 },
	{ month: "Nove", bruto: 7000, liquido: 6500 },
	{ month: "Dez", bruto: 7000, liquido: 6500 },
];

const RevenueChart = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Lucro Bruto vs Lucro Líquido</h2>
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedTimeRange}
					onChange={(e) => setSelectedTimeRange(e.target.value)}
				>
					<option>Essa Semana</option>
					<option>Esse Mês</option>
					<option>Esse Trimestre</option>
					<option>Esse Ano</option>
				</select>
			</div>

			<div style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<AreaChart data={revenueData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Area type='monotone' dataKey='bruto' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
						<Area type='monotone' dataKey='liquido' stroke='#10B981' fill='#10B981' fillOpacity={0.3} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default RevenueChart;
