import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialData = {
    Active: [
        {
            id: 1,
            nome: "John Doe",
            email: "john@example.com",
            profissao: "Engenheiro",
            ads: "R$ 1.500",
            cpa: "R$ 50",
            leads: 30,
            conversao: "12%",
            roas: "3.2x",
            canalPrincipal: "Meta Ads",
            tipoOferta: "Serviço de consultoria",
            tempoConversao: "5 dias"
        },
        {
            id: 2,
            nome: "Jane Smith",
            email: "jane@example.com",
            profissao: "Contador",
            ads: "R$ 1.400",
            cpa: "R$ 46.67",
            leads: 28,
            conversao: "10%",
            roas: "2.7x",
            canalPrincipal: "Google Ads",
            tipoOferta: "Serviço contábil mensal",
            tempoConversao: "7 dias"
        },
        {
            id: 3,
            nome: "Bob Johnson",
            email: "bob@example.com",
            profissao: "Programador",
            ads: "R$ 2.500",
            cpa: "R$ 62.5",
            leads: 40,
            conversao: "8%",
            roas: "2.1x",
            canalPrincipal: "Meta Ads",
            tipoOferta: "Infoproduto gravado",
            tempoConversao: "3 dias"
        },
        {
            id: 4,
            nome: "Alice Green",
            email: "alice@example.com",
            profissao: "Designer",
            ads: "R$ 1.800",
            cpa: "R$ 60",
            leads: 30,
            conversao: "11%",
            roas: "2.9x",
            canalPrincipal: "Instagram",
            tipoOferta: "Consultoria criativa",
            tempoConversao: "4 dias"
        },
        {
            id: 5,
            nome: "Alice Green",
            email: "alice@example.com",
            profissao: "Designer",
            ads: "R$ 1.800",
            cpa: "R$ 60",
            leads: 30,
            conversao: "11%",
            roas: "2.9x",
            canalPrincipal: "Instagram",
            tipoOferta: "Consultoria criativa",
            tempoConversao: "4 dias"
        },
        {
            id: 6,
            nome: "Alice Green",
            email: "alice@example.com",
            profissao: "Designer",
            ads: "R$ 1.800",
            cpa: "R$ 60",
            leads: 30,
            conversao: "11%",
            roas: "2.9x",
            canalPrincipal: "Instagram",
            tipoOferta: "Consultoria criativa",
            tempoConversao: "4 dias"
        }
    ]
};

const UsersTable = () => {
    const [data] = useState(initialData);
    const [startIndex, setStartIndex] = useState(0);

    const visibleClients = data.Active.slice(startIndex, startIndex + 3);
    const canGoNext = startIndex + 3 < data.Active.length;
    const canGoPrev = startIndex > 0;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-white font-semibold">Clientes</h2>
                <div className="flex gap-2">
                    {canGoPrev && (
                        <button
                            onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}
                            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded"
                        >Anterior</button>
                    )}
                    {canGoNext && (
                        <button
                            onClick={() => setStartIndex((prev) => prev + 1)}
                            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded"
                        >Próximo</button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {visibleClients.map((user) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 text-white border border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">{user.nome}</h2>
                                <span className="text-sm text-gray-400">{user.profissao}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <DataRow label="Email" value={user.email} />
                                <DataRow label="Leads" value={user.leads} />
                                <DataRow label="CPA" value={user.cpa} color="text-green-400" />
                                <DataRow label="ROAS" value={user.roas} color="text-pink-400" />
                                <DataRow label="Conversão" value={user.conversao} color="text-purple-400" />
                                <DataRow label="Ads" value={user.ads} color="text-blue-400" />
                                <DataRow label="Canal" value={user.canalPrincipal} />
                                <DataRow label="Oferta" value={user.tipoOferta} />
                                <DataRow label="Tempo" value={user.tempoConversao} />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const DataRow = ({ label, value, color }) => (
    <div className="flex flex-col">
        <span className="text-gray-400 text-xs">{label}</span>
        <span className={`font-medium ${color || "text-gray-100"}`}>{value}</span>
    </div>
);

export default UsersTable;