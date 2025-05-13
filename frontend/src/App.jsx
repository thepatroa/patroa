import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/ColaboradoresPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import BusinessOverviewForm from "./pages/InformationOverview";

function App() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/servicos' element={<ProductsPage />} />
				<Route path='/informacoes' element={<BusinessOverviewForm />} />
				<Route path='/clientes' element={<UsersPage />} />
				<Route path='/ads' element={<SalesPage />} />
				<Route path='/colaboradores' element={<OrdersPage />} />
				<Route path='/financeiro' element={<AnalyticsPage />} />
				<Route path='/configuracao' element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default App;
