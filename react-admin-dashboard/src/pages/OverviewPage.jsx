import { BarChart2, ShoppingBag, Users, Zap, Bird } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";

const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Visão Geral' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Faturamento Anual' icon={Zap} value='R$ 50.345' color='#6366F1' />
					<StatCard name='Lucro Anual' icon={Users} value='R$ 24.597' color='#8B5CF6' />
					<StatCard name='Custo com Impostos' icon={Bird} value='R$ 12.479' color='#10B981' />
					<StatCard name='Clientes Ativos' icon={ShoppingBag} value='14' color='#EC4899' />
					
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;
