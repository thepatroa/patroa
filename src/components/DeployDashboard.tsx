import React from "react";
import type { DeployDashboardProps } from "./DeployDashboardType.type";
import { Container } from "./DeployDashboard.style";
import type { DeployOut } from "./DeployDashboardType.type";

function DeployDashboard({ deploy }: DeployDashboardProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  const keysToShow: (keyof DeployOut)[] = [
    "id",
    "status",
    "created_at",
    "author",
    "branch"
  ];

  return (
    <Container>
      <h2>🚀 Deploy #{deploy.id}</h2>

      {keysToShow.map((key) => (
        <p key={key}>
          <strong>{key.replace(/_/g, " ")}:</strong> {String(deploy[key] ?? "")}
        </p>
      ))}

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Ocultar detalhes ▲" : "Mostrar detalhes ▼"}
      </button>

      {showDetails &&
        Object.entries(deploy)
          .filter(([key]) => !keysToShow.includes(key as keyof DeployOut))
          .map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {String(value ?? "")}
            </p>
          ))}
    </Container>
  );
}

export default DeployDashboard;
