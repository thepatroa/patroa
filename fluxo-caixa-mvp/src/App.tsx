import { useState } from "react";
import { Calendar } from "lucide-react";
import confetti from "canvas-confetti";

const FluxoCaixaMVP = () => {
  const [registros, setRegistros] = useState<{ id: number; data: string; valor: number; tipo: string }[]>([]);
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [dias, setDias] = useState<{ data: string; lucro: number }[]>([]);

  const hoje = new Date().toLocaleDateString("pt-BR");
  const total = registros.reduce((acc, reg) => acc + reg.valor, 0);

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

    setRegistros([...registros, novo]);
    setEntrada("");
    setSaida("");
    setMensagem(valor > 0 ? "🎉 Receita adicionada!" : "🧾 Despesa registrada!");
    tocarSom();

    setTimeout(() => setMensagem(""), 3000);
  };

  const fecharCaixa = () => {
    if (registros.length === 0) return;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setDias([...dias, { data: hoje, lucro: total }]);
    setRegistros([]);
    setMensagem("✅ Dia fechado com sucesso!");
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700 space-y-6">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
          📅 Caixa do Dia
        </h1>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-indigo-300">Registrar Movimento</h2>
          <input
            type="number"
            placeholder="Receita (R$)"
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 text-white"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
          />
          <input
            type="number"
            placeholder="Despesa (R$)"
            className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 text-white"
            value={saida}
            onChange={(e) => setSaida(e.target.value)}
          />
          <button
            onClick={handleRegistro}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white p-2 rounded font-semibold"
          >
            Registrar Movimento
          </button>
          {mensagem && <p className="text-sm text-green-300 text-center italic">{mensagem}</p>}
        </div>

        <div className="border-t border-gray-700 pt-4 space-y-4">
          <h2 className="text-lg font-semibold text-indigo-300">Resumo de Hoje ({hoje})</h2>
          <ul className="space-y-1 max-h-40 overflow-y-auto pr-2">
            {registros.map((reg) => (
              <li key={reg.id} className="flex justify-between text-sm border-b border-gray-700 pb-1">
                <span>{reg.tipo}</span>
                <span className={reg.valor >= 0 ? "text-green-400" : "text-red-400"}>
                  {reg.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold">
            Total:{" "}
            <span className={total >= 0 ? "text-green-400" : "text-red-400"}>
              {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <button
            onClick={fecharCaixa}
            className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white p-2 rounded font-semibold"
          >
            Fechar Dia
          </button>
        </div>

        {dias.length > 0 && (
          <div className="pt-4 border-t border-gray-700">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-indigo-300">
              <Calendar className="w-5 h-5" /> Histórico de Lucros
            </h2>
            <ul className="space-y-1 max-h-40 overflow-y-auto pr-2">
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
      </div>
    </div>
  );
};

export default FluxoCaixaMVP;
