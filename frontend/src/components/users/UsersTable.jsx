import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
const userData = [
	{
		id: 1,
		nome: "John Doe",
		email: "john@example.com",
		profissao: "Engenheiro",
		ads: "R$ 1.500",
		status: "Active",
		cpa: "R$ 50",
		leads: 30,
		conversao: "12%",
		roas: "3.2x",
		ctr: "5.8%",
		canalPrincipal: "Meta Ads",
		objetivoCampanha: "Geração de Leads",
		ticketMedio: "R$ 1.200",
		publicoAlvo: "Homens 30-45, engenheiros civis",
		landingPageOk: true,
		funilCompleto: true,
		remarketingAtivo: true,
		tempoConversao: "5 dias",
		tipoOferta: "Serviço de consultoria",
		criativosAtualizados: false
	},

	{
		id: 2,
		nome: "Jane Smith",
		email: "jane@example.com",
		profissao: "Contador",
		ads: "R$ 1.400",
		status: "Active",
		cpa: "R$ 46.67",
		leads: 28,
		conversao: "10%",
		roas: "2.7x",
		ctr: "4.5%",
		canalPrincipal: "Google Ads",
		objetivoCampanha: "Conversão direta",
		ticketMedio: "R$ 2.500",
		publicoAlvo: "MEIs e pequenas empresas",
		landingPageOk: true,
		funilCompleto: false,
		remarketingAtivo: false,
		tempoConversao: "7 dias",
		tipoOferta: "Serviço contábil mensal",
		criativosAtualizados: true
	},
	{
		id: 3,
		nome: "Bob Johnson",
		email: "bob@example.com",
		profissao: "Programador",
		ads: "R$ 2.500",
		status: "Inactive",
		cpa: "R$ 62.5",
		leads: 40,
		conversao: "8%",
		roas: "2.1x",
		ctr: "3.8%",
		canalPrincipal: "Meta Ads",
		objetivoCampanha: "Venda de curso",
		ticketMedio: "R$ 397",
		publicoAlvo: "Estudantes de TI e iniciantes",
		landingPageOk: false,
		funilCompleto: true,
		remarketingAtivo: false,
		tempoConversao: "3 dias",
		tipoOferta: "Infoproduto gravado",
		criativosAtualizados: false
	},
	{
		id: 4,
		nome: "Alice Brown",
		email: "alice@example.com",
		profissao: "Astronauta",
		ads: "R$ 400",
		status: "Active",
		cpa: "R$ 80",
		leads: 5,
		conversao: "5%",
		roas: "1.5x",
		ctr: "2.1%",
		canalPrincipal: "TikTok Ads",
		objetivoCampanha: "Branding",
		ticketMedio: "R$ 500",
		publicoAlvo: "Curiosos sobre ciência espacial",
		landingPageOk: true,
		funilCompleto: false,
		remarketingAtivo: false,
		tempoConversao: "10 dias",
		tipoOferta: "Mentoria ao vivo",
		criativosAtualizados: true
	},
	{
		id: 5,
		nome: "Charlie Wilson",
		email: "charlie@example.com",
		profissao: "Farmacêutico",
		ads: "R$ 1.500",
		status: "Active",
		cpa: "R$ 37.5",
		leads: 40,
		conversao: "15%",
		roas: "3.5x",
		ctr: "6.3%",
		canalPrincipal: "Meta Ads",
		objetivoCampanha: "Geração de Leads",
		ticketMedio: "R$ 800",
		publicoAlvo: "Farmacêuticos e donos de farmácia",
		landingPageOk: true,
		funilCompleto: true,
		remarketingAtivo: true,
		tempoConversao: "2 dias",
		tipoOferta: "Consultoria de estoque",
		criativosAtualizados: false
	}
];


const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.nome.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Lista de Clientes</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Buscar Clientes...'
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
								Nome
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Profissão
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Investimento em Ads
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								CPA
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Leads
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Conversão
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								ROAS
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								CTR
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Canal Principal
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Objetivo Campanha
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Ticket Medio
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Público Alvo
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Landing Page
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Funil Completo
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Remarketing Ativo
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Tempo Médio de Conversão
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Produto/Serviço
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Criativos Atualizados
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Ação
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{user.nome.charAt(0)}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.nome}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.profissao}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.ads}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "Active"
											? "bg-green-800 text-green-100"
											: "bg-red-800 text-red-100"
											}`}
									>
										{user.status}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800'>
										{user.cpa}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
										{user.leads}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
										{user.conversao}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800'>
										{user.roas}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800'>
										{user.ctr}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
										{user.canalPrincipal}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
										{user.objetivoCampanha}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800'>
										{user.ticketMedio}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-100 text-rose-800'>
										{user.publicoAlvo}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.landingPageOk ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
										{user.landingPageOk ? 'Sim' : 'Não'}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.funilCompleto ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
										{user.funilCompleto ? 'Sim' : 'Não'}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.remarketingAtivo ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
										{user.remarketingAtivo ? 'Sim' : 'Não'}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800'>
										{user.tempoConversao}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800'>
										{user.tipoOferta}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.criativosAtualizados ? 'bg-lime-100 text-lime-800' : 'bg-gray-200 text-gray-700'}`}>
										{user.criativosAtualizados ? 'Atualizados' : 'Desatualizados'}
									</span>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
									<button className='text-red-400 hover:text-red-300'>Delete</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default UsersTable;
