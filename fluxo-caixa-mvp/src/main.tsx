import React from "react";
import ReactDOM from "react-dom/client";
import FluxoCaixaMVP from "./App";
import "./index.css"; // <- ESSE AQUI É ESSENCIAL

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluxoCaixaMVP />
  </React.StrictMode>
);
