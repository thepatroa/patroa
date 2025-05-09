import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import CustoDeAquisicaoDeClientes from "../components/sales/CustoDeAquisicaoDeClientes";

const salesStats = {
	totalAdsSpending: "R$ 10.864",
	mediaROAS: "2.1",
	leadsGerados: "2.764",
	salesGrowth: "12.3%",
};

const SalesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Ads' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* SALES STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Gasto Mensal com Ads' icon={DollarSign} value={salesStats.totalAdsSpending} color='#6366F1' />
					<StatCard
						name='ROAS Médio'
						icon={ShoppingCart}
						value={salesStats.mediaROAS}
						color='#10B981'
					/>
					<StatCard
						name='Leads Mensais Gerados'
						icon={TrendingUp}
						value={salesStats.leadsGerados}
						color='#F59E0B'
					/>
					<StatCard name='Crescimento das Vendas' icon={CreditCard} value={salesStats.salesGrowth} color='#EF4444' />
				</motion.div>

				<SalesOverviewChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<SalesByCategoryChart />
					<CustoDeAquisicaoDeClientes />
				</div>
			</main>
		</div>
	);
};
export default SalesPage;
