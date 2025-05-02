import { CheckCircle, Clock, DollarSign, ShoppingBag, Landmark, Wallet } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";

const orderStats = {
	totalOrders: "7",
	pendingOrders: "R$ 2.750",
	completedOrders: "R$ 1.678",
	totalRevenue: "R$ 25.765",
};

const OrdersPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Colaboradores"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Número de Colaboradores' icon={ShoppingBag} value={orderStats.totalOrders} color='#6366F1' />
					<StatCard name='Custo Médio por Colaborador' icon={Landmark} value={orderStats.pendingOrders} color='#F59E0B' />
					<StatCard
						name='Media Salarial'
						icon={Wallet}
						value={orderStats.completedOrders}
						color='#10B981'
					/>
					<StatCard name='Folha de Pagamento' icon={DollarSign} value={orderStats.totalRevenue} color='#EF4444' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution />
				</div>

				<OrdersTable />
			</main>
		</div>
	);
};
export default OrdersPage;
