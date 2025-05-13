import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const salesData = [
	{ name: "Janeiro", faturamento: 6100 },
	{ name: "Fevereiro", faturamento: 5900 },
	{ name: "Março", faturamento: 6800 },
	{ name: "Abril", faturamento: 6300 },
	{ name: "Maio", faturamento: 7100 },
	{ name: "Junho", faturamento: 7500 },
	{ name: "Julho", faturamento: 4200 },
	{ name: "Agosto", faturamento: 3800 },
	{ name: "Setembro", faturamento: 5100 },
	{ name: "Outubro", faturamento: 4600 },
	{ name: "Novembro", faturamento: 5400 },
	{ name: "Dezembro", faturamento: 7200 },
];

const CustomTooltip = ({ active, payload, label }) => {
	if (!active || !payload?.length) return null;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg border border-indigo-500"
		>
			<p className="text-sm font-semibold">{label}</p>
			<p className="text-sm">Faturamento: R$ {payload[0].value.toLocaleString("pt-BR")}</p>
		</motion.div>
	);
};

const SalesOverviewChart = () => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false, amount: 0.4 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">📈 Faturamento por Mês</h2>

			<div className="h-80">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="name" stroke="#9ca3af" />
						<YAxis stroke="#9ca3af" />
						<Tooltip content={<CustomTooltip />} />
						<Line
							type="monotone"
							dataKey="faturamento"
							stroke="#6366F1"
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
							isAnimationActive={true}
							animationDuration={1000}
							animationEasing="ease-out"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesOverviewChart;
