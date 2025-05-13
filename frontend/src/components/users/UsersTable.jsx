import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      nome: "Lucas Silva",
      email: "lucas@example.com",
      profissao: "Médico",
      ads: "R$ 2.000",
      cpa: "R$ 66.67",
      leads: 30,
      conversao: "10%",
      roas: "2.5x",
      canalPrincipal: "Google Ads",
      tipoOferta: "Consulta online",
      tempoConversao: "2 dias"
    },
    {
      id: 6,
      nome: "Maria Oliveira",
      email: "maria@example.com",
      profissao: "Nutricionista",
      ads: "R$ 1.200",
      cpa: "R$ 40",
      leads: 30,
      conversao: "12%",
      roas: "3.0x",
      canalPrincipal: "Instagram",
      tipoOferta: "Mentoria alimentar",
      tempoConversao: "6 dias"
    }
  ]
};

const UsersTable = () => {
  const [startIndex, setStartIndex] = useState(0);
  const clients = initialData.Active;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev + 1 > clients.length - 3 ? 0 : prev + 1
      );
    }, 3000); // muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [clients.length]);

  return (
    <div className="p-8 overflow-hidden">
      <h2 className="text-xl text-white font-semibold mb-4">Clientes</h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${startIndex * (100 / 3)}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ width: `${(clients.length / 3) * 100}%` }}
        >
          {clients.map((user, index) => (
            <div
              key={user.id + index}
              className="min-w-[33.3333%] max-w-[33.3333%] px-2"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 text-white border border-gray-700 h-full">
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
              </div>
            </div>
          ))}
        </motion.div>
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
