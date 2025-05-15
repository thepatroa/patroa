import { useEffect, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const UsersTable = ({ campanhas }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const x = useRef(0);

  useAnimationFrame((t, delta) => {
    if (!containerRef.current || !contentRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;

    x.current -= 0.5; // velocidade
    if (Math.abs(x.current) >= contentWidth / 2) {
      x.current = 0;
    }

    contentRef.current.style.transform = `translateX(${x.current}px)`;
  });

  // Duplicar campanhas para o loop
  const campanhasDuplicadas = [...campanhas, ...campanhas];

  return (
    <div className="p-8 overflow-hidden">
      <h2 className="text-2xl text-white font-bold mb-6">Campanhas</h2>

      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <div
          ref={contentRef}
          className="flex gap-4 whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {campanhasDuplicadas.map((campanha, index) => (
            <div
              key={campanha.id + index}
              className="w-[320px] flex-shrink-0"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 text-white border border-indigo-600 h-full">
                <div className="mb-3">
                  <h3
                    className="text-xl font-bold text-indigo-300 mb-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                    title={campanha.nome}
                  >
                    {campanha.nome}
                  </h3>
                  <p className="text-sm text-gray-300">
                    🎯 Objetivo: <span className="text-indigo-400">{campanha.objetivo}</span>
                  </p>
                  <p className={`text-xs mt-1 font-bold ${getStatusColor(campanha.status)}`}>
                    ⚙️ Status: {campanha.status}
                  </p>
                </div>

                <hr className="border-gray-700 my-3" />

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <DataRow label="📅 Início" value={formatarData(campanha.inicio)} />
                  <DataRow label="🏁 Fim" value={formatarData(campanha.fim)} />
                  <DataRow label="💰 Orçamento" value={`R$ ${campanha.orcamento_diario}`} />
                  <DataRow label="🧾 Tipo" value={campanha.tipo_de_orcamento} />
                  <DataRow label="📢 Ativos" value={campanha.quantidade_de_anuncios_ativos} />
                </div>
              </div>
            </div>
          ))}
        </div>
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
    year: "numeric",
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
