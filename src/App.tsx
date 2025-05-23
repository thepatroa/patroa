import React, { useEffect, useState } from "react";
import DeployDashboard from "./components/DeployDashboard";
import type { DeployOut } from "./components/DeployDashboardType.type";

function App() {
  const [deploy, setDeploy] = useState<DeployOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/deploys")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar deploys");
        return res.json();
      })
      .then((data) => {
        // Supondo que a API retorna uma lista de deploys, pegue o mais recente:
        if (Array.isArray(data) && data.length > 0) {
          setDeploy(data[0]);
        } else {
          setError("Nenhum deploy encontrado");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Patroa</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {deploy && <DeployDashboard deploy={deploy} />}
    </div>
  );
}

export default App;
