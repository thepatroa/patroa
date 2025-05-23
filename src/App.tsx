import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [resultado, setResultado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/categorizar/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResultado(response.data.resultado);
    } catch (error: any) {
      alert("Erro ao enviar arquivo: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Categorizador de Gastos 💳</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ marginBottom: "1rem" }}
      />

      <br />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Enviando..." : "Enviar para Análise"}
      </button>

      {resultado && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", background: "#f6f6f6", padding: "1rem", borderRadius: "8px" }}>
          <h2>Resultado:</h2>
          <pre>{resultado}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
