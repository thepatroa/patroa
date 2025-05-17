import { useState, useEffect } from "react";
import { Calendar, Plus, DollarSign } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const FluxoCaixaMVP = () => {
  const [registros, setRegistros] = useState<{ id: number; data: string; valor: number; tipo: string }[]>([]);
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [dias, setDias] = useState<{ data: string; lucro: number }[]>([]);
  const [metaBatida, setMetaBatida] = useState(false);

  const hoje = new Date().toLocaleDateString("pt-BR");
  const total = registros.reduce((acc, reg) => acc + reg.valor, 0);
  const metaDiaria = 100;
  const progresso = Math.min((total / metaDiaria) * 100, 100);
  const moedas = Math.floor(total / 10);

  const tocarSom = () => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav");
    audio.play();
  };

  const handleRegistro = () => {
    if (!entrada && !saida) return;

    const valor = entrada ? parseFloat(entrada) : -parseFloat(saida);
    const tipo = entrada ? "Entrada" : "Saída";

    const novo = {
      id: Date.now(),
      data: hoje,
      valor,
      tipo,
    };

    const novoTotal = total + valor;

    // Confetti especial se bater a meta
    if (novoTotal >= metaDiaria && !metaBatida) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 } });
      setMensagem("🚀 Meta diária batida! Parabéns!");
      setMetaBatida(true);
    } else {
      setMensagem(valor > 0 ? "🎉 Receita adicionada!" : "🧾 Despesa registrada!");
    }

    setRegistros([...registros, novo]);
    setEntrada("");
    setSaida("");
    tocarSom();

    setTimeout(() => setMensagem(""), 3000);
  };

  const fecharCaixa = () => {
    if (registros.length === 0) return;
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setDias([...dias, { data: hoje, lucro: total }]);
    setRegistros([]);
    setMensagem("✅ Dia fechado com sucesso!");
    setMetaBatida(false);
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 space-y-8"
      >
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-400 via-indigo-400 to-purple-600 bg-clip-text text-transparent">
          Fluxo de Caixa
        </h1>

        {/* Meta diária e moedas */}
        <div className="space-y-2">
          <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-green-300">
            <span>{progresso >= 100 ? "🎯 Meta batida!" : `Progresso: ${progresso.toFixed(0)}%`}</span>
            <span>🪙 Moedas: {moedas}</span>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-indigo-300">Novo Registro</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Entrada (R$)"
              className="p-2 rounded bg-gray-700 text-green-300 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
            />
            <input
              type="number"
              placeholder="Saída (R$)"
              className="p-2 rounded bg-gray-700 text-red-300 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={saida}
              onChange={(e) => setSaida(e.target.value)}
            />
          </div>
          <button
            onClick={handleRegistro}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Adicionar Movimento
          </button>
          {mensagem && (
            <p className="text-sm text-center text-green-300 italic animate-pulse">
              {mensagem}
            </p>
          )}
        </div>

        {/* Resumo do dia */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-indigo-300">Resumo de Hoje ({hoje})</h2>
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {registros.map((reg) => (
              <li key={reg.id} className="flex justify-between text-sm border-b border-gray-700 pb-1">
                <span>{reg.tipo}</span>
                <span className={reg.valor >= 0 ? "text-green-400" : "text-red-400"}>
                  {reg.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg">
            Total:{" "}
            <span className={total >= 0 ? "text-green-400" : "text-red-400"}>
              {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <button
            onClick={fecharCaixa}
            className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <DollarSign size={18} /> Fechar Dia
          </button>
        </div>

        {/* Histórico */}
        {dias.length > 0 && (
          <div className="space-y-4 border-t border-gray-700 pt-6">
            <h2 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
              <Calendar size={18} /> Histórico de Lucros
            </h2>
            <ul className="space-y-1 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {dias.map((dia, idx) => (
                <li key={idx} className="flex justify-between text-sm border-b border-gray-700 pb-1">
                  <span>{dia.data}</span>
                  <span className={dia.lucro >= 0 ? "text-green-400" : "text-red-400"}>
                    {dia.lucro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FluxoCaixaMVP;
