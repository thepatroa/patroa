import { useEffect, useState } from "react";
import axios from "axios";

export const useCampanhas = () => {
  const [campanhas, setCampanhas] = useState([]);
  const [gastoMensal, setGastoMensal] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/facebook/campanhas");
        setCampanhas(response.data.campanhas);
        setGastoMensal(response.data.gasto_mensal_reais || 0);
      } catch (err) {
        setErro(err.message || "Erro ao buscar campanhas");
      } finally {
        setCarregando(false);
      }
    };

    fetchCampanhas();
  }, []);

  return { campanhas, gastoMensal, carregando, erro };
};
