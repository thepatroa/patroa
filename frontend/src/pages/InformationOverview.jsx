import { useState } from "react";
import { DollarSign, Users, UserCheck, UserPlus, Briefcase, FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
	minimumFractionDigits: 2,
});

const BusinessOverviewForm = () => {
	const [form, setForm] = useState({
		lastMonthRevenue: "",
		totalClients: "",
		activeClients: "",
		lastMonthLeads: "",
		totalEmployees: "",
		companyType: "MEI",
		employees: [{ name: "", salary: "", role: "" }],
		servicePrice: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCurrencyChange = (e) => {
		const raw = e.target.value.replace(/\D/g, "");
		const formatted = currencyFormatter.format(Number(raw) / 100);
		setForm({ ...form, [e.target.name]: formatted });
	};

	const handleEmployeeChange = (index, field, value) => {
		const updated = [...form.employees];
		updated[index][field] =
			field === "salary" ? currencyFormatter.format(Number(value.replace(/\D/g, "")) / 100) : value;
		setForm({ ...form, employees: updated });
	};

	const addEmployee = () => {
		setForm({ ...form, employees: [...form.employees, { name: "", salary: "", role: "" }] });
	};

	const removeEmployee = (indexToRemove) => {
		const updated = form.employees.filter((_, idx) => idx !== indexToRemove);
		setForm({ ...form, employees: updated });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("📤 Dados para envio:", JSON.stringify(form, null, 2));
		alert("Dados prontos para envio. Veja no console.");
	};

	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<h2 className='text-2xl font-semibold mb-6 text-gray-100'>📋 Dados do Negócio</h2>

				<form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-100'>
					<InputField label='Faturamento Mês Passado' name='lastMonthRevenue' icon={DollarSign} value={form.lastMonthRevenue} onChange={handleCurrencyChange} />
					<InputField label='Total de Clientes' name='totalClients' icon={Users} value={form.totalClients} onChange={handleChange} />
					<InputField label='Clientes Ativos' name='activeClients' icon={UserCheck} value={form.activeClients} onChange={handleChange} />
					<InputField label='Leads Mês Passado' name='lastMonthLeads' icon={UserPlus} value={form.lastMonthLeads} onChange={handleChange} />
					<InputField label='Número de Funcionários' name='totalEmployees' icon={Briefcase} value={form.totalEmployees} onChange={handleChange} />

					{/* SELECT TIPO DE EMPRESA */}
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-2'>Tipo de Empresa</label>
						<div className='bg-gray-800 border border-gray-700 rounded-lg px-4 py-2'>
							<select
								name='companyType'
								value={form.companyType}
								onChange={handleChange}
								className='w-full bg-transparent text-white outline-none'
							>
								<option value='MEI'>MEI</option>
								<option value='Microempresa'>Microempresa</option>
								<option value='Pequena Empresa'>Pequena Empresa</option>
							</select>
						</div>
					</div>

					<InputField label='Preço do Serviço' name='servicePrice' icon={DollarSign} value={form.servicePrice} onChange={handleCurrencyChange} />

					{/* FUNCIONÁRIOS */}
					<div className='sm:col-span-2'>
						<label className='block text-sm font-medium text-gray-300 mb-2'>Funcionários</label>

						<AnimatePresence>
							{form.employees.map((emp, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
									className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 relative'
								>
									<input
										type='text'
										placeholder='Nome'
										className='bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400'
										value={emp.name}
										onChange={(e) => handleEmployeeChange(index, "name", e.target.value)}
									/>
									<input
										type='text'
										placeholder='Cargo'
										className='bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400'
										value={emp.role}
										onChange={(e) => handleEmployeeChange(index, "role", e.target.value)}
									/>
									<div className='flex gap-2'>
										<input
											type='text'
											placeholder='Salário'
											className='flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 placeholder-gray-400'
											value={emp.salary}
											onChange={(e) => handleEmployeeChange(index, "salary", e.target.value)}
										/>
										{form.employees.length > 1 && (
											<button
												type='button'
												onClick={() => removeEmployee(index)}
												className='text-red-500 hover:text-red-400 px-2'
												title='Remover colaborador'
											>
												<Trash2 size={20} />
											</button>
										)}
									</div>
								</motion.div>
							))}
						</AnimatePresence>

						<button
							type='button'
							onClick={addEmployee}
							className='text-sm text-indigo-400 hover:underline'
						>
							+ Adicionar Funcionário
						</button>
					</div>

					{/* BOTÃO ENVIAR */}
					<div className='sm:col-span-2 mt-4'>
						<button
							type='submit'
							className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg'
						>
							📤 Enviar Dados
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

const InputField = ({ label, name, icon: Icon, value, onChange }) => (
	<div>
		<label className='block text-sm font-medium text-gray-300 mb-2'>{label}</label>
		<div className='flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-2'>
			<Icon className='text-gray-400 w-5 h-5 mr-2' />
			<input
				type='text'
				name={name}
				value={value}
				onChange={onChange}
				className='w-full bg-transparent text-white outline-none placeholder-gray-400'
				placeholder={label}
			/>
		</div>
	</div>
);

export default BusinessOverviewForm;
