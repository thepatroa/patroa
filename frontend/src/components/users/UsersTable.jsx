import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const UsersTable = ({ campanhas }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (isPaused || campanhas.length <= 2) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1 > campanhas.length - 2 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [campanhas.length, isPaused]);

  return (
    <div className="p-8 overflow-hidden">
      <h2 className="text-2xl text-white font-bold mb-6">Campanhas</h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: `-${startIndex * (100 / 2)}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ width: `${(campanhas.length / 2) * 100}%` }}
        >
          {campanhas.map((campanha, index) => (
            <motion.div
              key={campanha.id + index}
              className="min-w-[50%] px-2"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 text-white border-2 border-indigo-600 h-full">
                <div className="mb-4">
                  <h3
                    className="text-2xl font-extrabold text-indigo-300 mb-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                    title={campanha.nome}
                  >
                    {campanha.nome}
                  </h3>
                  <p className="text-sm text-gray-300">🎯 Objetivo: <span className="text-indigo-400">{campanha.objetivo}</span></p>
                  <p className={`text-xs mt-1 font-bold ${getStatusColor(campanha.status)}`}>⚙️ Status: {campanha.status}</p>
                </div>

                <hr className="border-gray-700 my-4" />

                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <DataRow label="📅 Início" value={formatarData(campanha.inicio)} />
                  <DataRow label="🏁 Fim" value={formatarData(campanha.fim)} />
                  <DataRow label="💰 Orçamento" value={`R$ ${campanha.orcamento_diario}`} />
                  <DataRow label="🧾 Tipo" value={campanha.tipo_de_orcamento} />
                  <DataRow label="📢 Anúncios Ativos" value={campanha.quantidade_de_anuncios_ativos} />
                  <DataRow label="🆕 Criada em" value={formatarData(campanha.criada_em)} />
                  <DataRow label="🔄 Atualizada em" value={formatarData(campanha.atualizada_em)} />
                </div>

                {campanha.anuncios && campanha.anuncios.length > 0 && (
                  <div className="mt-6">
                    <button
                      onClick={() => setExpandedId(expandedId === campanha.id ? null : campanha.id)}
                      className="text-indigo-300 hover:text-indigo-500 text-sm font-semibold"
                    >
                      {expandedId === campanha.id ? "Ocultar anúncios" : "Ver anúncios"}
                    </button>

                    {expandedId === campanha.id && (
                      <div className="mt-3 space-y-3">
                        {campanha.anuncios.map((anuncio) => (
                          <div key={anuncio.id} className="border border-gray-600 p-4 rounded-lg bg-gray-800">
                            <p className="text-sm font-semibold text-indigo-200">📌 {anuncio.nome}</p>
                            <p className="text-xs text-gray-300">Status: <span className={getStatusColor(anuncio.status)}>{anuncio.status}</span></p>
                            <p className="text-xs text-gray-300">Tipo: {anuncio.tipo}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const DataRow = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-semibold text-white">{value}</span>
  </div>
);

const formatarData = (dataISO) => {
  if (!dataISO) return "-";
  return new Date(dataISO).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

const getStatusColor = (status) => {
  const normalized = status?.toUpperCase();

  switch (normalized) {
    case "ATIVO":
    case "ATIVA":
      return "text-green-500";
    case "PAUSADO":
    case "PAUSADA":
      return "text-yellow-400";
    case "REMOVIDO":
    case "REMOVIDA":
    case "DESATIVADO":
    case "DESATIVADA":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
};


export default UsersTable;