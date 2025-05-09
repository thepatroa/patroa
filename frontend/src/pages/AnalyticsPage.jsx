import Header from "../components/common/Header";

import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import FinancialRunwayChart from "../components/analytics/FinancialRunwayChart";
import RevenueProjectionChart from "../components/analytics/RevenueProjectionChart";
import LifetimeValueCard from "../components/analytics/LifetimeValueCard";

const currentCash = 30000;
const burnRate = 5000;
const currentRevenue = 5000;
const growthRate = 50;
const ltv = 15000;
const averageRevenue = 5000;
const averageLifespan = 36;

const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Financeiro"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<LifetimeValueCard ltv={ltv} averageLifespan={averageLifespan} averageRevenue={averageRevenue} />
					<ProductPerformance />
					
				</div>
					<RevenueProjectionChart currentRevenue={currentRevenue} growthRate={growthRate}/>
					<FinancialRunwayChart currentCash={currentCash} burnRate={burnRate} />

			</main>
		</div>
	);
};
export default AnalyticsPage;
