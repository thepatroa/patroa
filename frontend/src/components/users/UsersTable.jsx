import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const UsersTable = ({ campanhas }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || campanhas.length <= 3) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1 > campanhas.length - 3 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [campanhas.length, isPaused]);

  return (
    <div className="p-8 overflow-hidden">
      <h2 className="text-xl text-white font-semibold mb-4">Campanhas</h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
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
              whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.3 } }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 text-white border border-gray-700 h-full flex flex-col justify-between">
                <div className="mb-4">
                  <h3
                    className="text-lg font-bold mb-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                    title={campanha.nome}
                  >
                    {campanha.nome}
                  </h3>
                  <p className="text-sm text-gray-400">Objetivo: {campanha.objetivo}</p>
                  <p className="text-xs text-blue-300 mt-1">Status: {campanha.status}</p>
                </div>

                <hr className="border-gray-700 my-3" />

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  <DataRow label="Início" value={formatarData(campanha.inicio)} />
                  <DataRow label="Fim" value={formatarData(campanha.fim)} />
                  <DataRow label="Orçamento" value={`R$ ${campanha.orcamento_diario}`} />
                  <DataRow label="Tipo" value={campanha.tipo_de_orcamento} />
                  <DataRow label="Anúncios Ativos" value={campanha.quantidade_de_anuncios_ativos} />
                  <DataRow label="Criada em" value={formatarData(campanha.criada_em)} />
                  <DataRow label="Atualizada em" value={formatarData(campanha.atualizada_em)} />
                  <DataRow label="Status Configurado" value={campanha.status_configurado} />
                  <DataRow label="Orçamento Total" value={campanha.orcamento_total ? `R$ ${campanha.orcamento_total}` : "-"} />

                  {campanha.anuncios?.length > 0 && (
                    <div className="col-span-2">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Anúncios</span>
                      <ul className="text-sm mt-1 list-disc list-inside text-white space-y-1">
                        {campanha.anuncios.map((anuncio) => (
                          <li key={anuncio.id}>
                            {anuncio.nome} - {anuncio.status} ({anuncio.tipo})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
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

export default UsersTable;