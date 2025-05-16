import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CheckCircle, AlertTriangle, Star } from "lucide-react";

const checklistItens = [
  {
    pergunta: "Você envia recibos ou notas para seus clientes?",
    dica: "Clientes sentem mais confiança quando recebem comprovantes."
  },
  {
    pergunta: "Você mantém um canal fixo de comunicação com os clientes?",
    dica: "Ter um canal claro evita cancelamentos por falta de resposta."
  },
  {
    pergunta: "Você oferece planos anuais com desconto?",
    dica: "Isso reduz churn e aumenta o LTV."
  },
  {
    pergunta: "Você faz follow-up após a entrega do serviço?",
    dica: "Mostrar interesse após a entrega fideliza o cliente."
  },
  {
    pergunta: "Você monitora cancelamentos e seus motivos?",
    dica: "Saber por que clientes saem é essencial para melhorar."
  }
];

const getLevel = (score) => {
  if (score === 5) return { nivel: "Mestre da Retenção", estrelas: 5, cor: "#10B981", mensagem: "Parabéns! Sua gestão é incrível! Seus clientes devem te amar 💚" };
  if (score >= 3) return { nivel: "Intermediário", estrelas: 3, cor: "#F59E0B", mensagem: "Você está no caminho! Mas tem ajustes importantes a fazer." };
  return { nivel: "Iniciante", estrelas: 1, cor: "#EF4444", mensagem: "Cuidado! Você pode estar perdendo clientes sem perceber 😥" };
};

const ChecklistRetencao = () => {
  const [respostas, setRespostas] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const [etapa, setEtapa] = useState(0);

  const handleResposta = (resposta) => {
    const novasRespostas = [...respostas, resposta];
    setRespostas(novasRespostas);
    if (novasRespostas.length === checklistItens.length) {
      setTimeout(() => setMostrarResultado(true), 300);
    } else {
      setEtapa(etapa + 1);
    }
  };

  const reiniciarChecklist = () => {
    setRespostas([]);
    setMostrarResultado(false);
    setEtapa(0);
    setIniciado(false);
  };

  const score = respostas.filter(r => r === true).length;
  const total = checklistItens.length;
  const { nivel, estrelas, cor, mensagem } = getLevel(score);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white'>
      <Header title='Checklist de Retenção' />

      <main className='max-w-2xl mx-auto py-6 px-4 lg:px-8'>
        {!iniciado && (
          <div className='flex flex-col items-center justify-center h-64'>
            <motion.button
              onClick={() => setIniciado(true)}
              className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg text-lg'
              whileTap={{ scale: 0.95 }}
            >
              🚀 Começar Teste
            </motion.button>
          </div>
        )}

        <AnimatePresence>
          {iniciado && respostas.length < checklistItens.length && (
            <motion.div
              key={etapa}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className='bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-2xl text-white w-[90%] max-w-xl'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h3 className='text-xl font-bold mb-4'>{checklistItens[etapa].pergunta}</h3>
                <div className='flex justify-center gap-6'>
                  <button
                    onClick={() => handleResposta(true)}
                    className='px-6 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold'
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => handleResposta(false)}
                    className='px-6 py-2 bg-red-500 hover:bg-red-600 rounded text-white font-semibold'
                  >
                    Não
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mostrarResultado && (
            <motion.div
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className='bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-2xl text-white w-[90%] max-w-xl'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h3 className='text-2xl font-bold mb-2'>Resultado Final 🎉</h3>
                <p className='text-lg mb-4' style={{ color: cor }}>{mensagem}</p>
                <p className='text-sm text-gray-400 mb-4'>Você acertou {score} de {total} itens do checklist.</p>
                <div className='flex justify-end gap-4'>
                  <button
                    onClick={reiniciarChecklist}
                    className='px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg'
                  >
                    Reiniciar Checklist
                  </button>
                  <button
                    onClick={() => setMostrarResultado(false)}
                    className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg'
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ChecklistRetencao;