import { useState } from "react";
import { motion } from "framer-motion";
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
  if (score === 5) return { nivel: "Mestre da Retenção", estrelas: 5, cor: "#10B981" };
  if (score >= 3) return { nivel: "Intermediário", estrelas: 3, cor: "#F59E0B" };
  return { nivel: "Iniciante", estrelas: 1, cor: "#EF4444" };
};

const ChecklistRetencao = () => {
  const [respostas, setRespostas] = useState(Array(checklistItens.length).fill(null));

  const handleResposta = (index, resposta) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = resposta;
    setRespostas(novasRespostas);
  };

  const score = respostas.filter(r => r === true).length;
  const total = checklistItens.length;
  const { nivel, estrelas, cor } = getLevel(score);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white'>
      <Header title='Checklist de Retenção' />

      <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='mb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name={`Pontuação: ${nivel}`}
            icon={CheckCircle}
            value={`${score} / ${total}`}
            color={cor}
          />
          <div className='flex items-center space-x-1 mt-2'>
            {[...Array(estrelas)].map((_, i) => (
              <Star key={i} className='text-yellow-400' />
            ))}
            {[...Array(5 - estrelas)].map((_, i) => (
              <Star key={i} className='text-gray-600' />
            ))}
          </div>
        </motion.div>

        <div className='space-y-6'>
          {checklistItens.map((item, index) => (
            <div
              key={index}
              className='border border-gray-600 rounded-xl p-4 shadow-sm bg-gray-800'
            >
              <p className='text-lg font-medium mb-2 text-white'>{item.pergunta}</p>
              <div className='flex space-x-4'>
                <button
                  onClick={() => handleResposta(index, true)}
                  className={`px-4 py-2 rounded-md font-semibold ${respostas[index] === true ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200'}`}
                >
                  Sim
                </button>
                <button
                  onClick={() => handleResposta(index, false)}
                  className={`px-4 py-2 rounded-md font-semibold ${respostas[index] === false ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-200'}`}
                >
                  Não
                </button>
              </div>
              <p className='text-sm text-gray-400 mt-3'>{item.dica}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChecklistRetencao;