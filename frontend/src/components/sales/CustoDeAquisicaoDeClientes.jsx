import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dailySalesData = [
	{ name: "Jan", cac: 60 },
	{ name: "Fev", cac: 99 },
	{ name: "Mar", cac: 45 },
	{ name: "Abr", cac: 20 },
	{ name: "Mai", cac: 60 },
	{ name: "Jun", cac: 150 },
	{ name: "Jul", cac: 120 },
	{ name: "Ago", cac: 93 },
	{ name: "Set", cac: 13 },
	{ name: "Out", cac: 74 },
	{ name: "Nov", cac: 35 },
	{ name: "Dez", cac: 92 },
];

const CustoDeAquisicaoDeClientes = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Custo de Aquisição de Clientes</h2>

			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Bar dataKey='cac' fill='#10B981' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default CustoDeAquisicaoDeClientes;
