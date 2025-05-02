import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";

const orderData = [
	{ id: "ORD001", colaborador: "John Doe", salario: 1700.2, fp: 2500.4, date: "2023-07-01" },
	{ id: "ORD002", colaborador: "Jane Smith", salario: 1.3120, fp: 2500.4, date: "2023-07-02" },
	{ id: "ORD003", colaborador: "Bob Johnson", salario: 162.5, fp: 2500.4, date: "2023-07-03" },
	{ id: "ORD004", colaborador: "Alice Brown", salario: 750.2, fp: 2500.4, date: "2023-07-04" },
	{ id: "ORD005", colaborador: "Charlie Wilson", salario: 95.8, fp: 2500.4, date: "2023-07-05" },
	{ id: "ORD006", colaborador: "Eva Martinez", salario: 310.75, fp: 2500.4, date: "2023-07-06" },
	{ id: "ORD007", colaborador: "David Lee", salario: 528.9, fp: 2500.4, date: "2023-07-07" },
	{ id: "ORD008", colaborador: "Grace Taylor", salario: 189.6, fp: 2500.4, date: "2023-07-08" },
];

const OrdersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState(orderData);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = orderData.filter(
			(order) => order.id.toLowerCase().includes(term) || order.customer.toLowerCase().includes(term)
		);
		setFilteredOrders(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Lista de Colaboradores</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Procurar Colabs...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								ID do Colaborador
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Colaborador
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Salário
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Folha de Pagamento
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Data de Contratação
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Ação
							</th>
						</tr>
					</thead>

					<tbody className='divide divide-gray-700'>
						{filteredOrders.map((order) => (
							<motion.tr
								key={order.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
									{order.id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
									{order.colaborador}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
									R$ {order.salario.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									R$ {order.fp.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{order.date}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Eye size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default OrdersTable;
