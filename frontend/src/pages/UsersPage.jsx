import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import LoadingBar from "../components/ui/LoadingBar";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import { useCampanhas } from "../hooks/useCampanhas";

const userStats = {
  totalUsers: 35,
  newUsersToday: 5,
  activeUsers: 29,
  churnRate: "2.4%",
};

const UsersPage = () => {
  const { campanhas, carregando, erro } = useCampanhas();

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Clientes' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name='Clientes Totais'
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color='#6366F1'
          />
          <StatCard name='Novos Clientes' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' />
          <StatCard
            name='Clientes Ativos'
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color='#F59E0B'
          />
          <StatCard name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' />
        </motion.div>

        {carregando ? (
          <LoadingBar/>
        ) : erro ? (
          <p className="text-red-500">Erro ao carregar campanhas: {erro}</p>
        ) : (
          <UsersTable campanhas={campanhas} />
        )}

        {/* USER CHARTS */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>
    </div>
  );
};

export default UsersPage;