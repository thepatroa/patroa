import type { DeployDashboardProps } from "./DeployDashboardType.type";
import { Container } from "./DeployDashboard.style";

function DeployDashboard({ deploy }: DeployDashboardProps) {
  return (
    <Container>
      <h2>🚀 Deploy #{deploy.id}</h2>
      {Object.entries(deploy).map(([key, value]) => (
        <p key={key}>
          <strong>{key.replace(/_/g, " ")}:</strong> {String(value)}
        </p>
      ))}
    </Container>
  );
}

export default DeployDashboard;
