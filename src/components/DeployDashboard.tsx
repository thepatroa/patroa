import type { DeployDashboardProps } from "./DeployDashboardType.type";
import { Container } from "./DeployDashboard.style";

function DeployDashboard({ deploy }: DeployDashboardProps) {
  return (
    <Container>
      <h2>🚀 Deploy #{deploy.id}</h2>
      <p><strong>Status:</strong> {deploy.status}</p>
      <p><strong>Branch:</strong> {deploy.branch}</p>
      <p><strong>Author:</strong> {deploy.author} ({deploy.author_email})</p>
      <p><strong>Commit:</strong> {deploy.commit_hash} — {deploy.commit_message}</p>
      <p><strong>Timestamp:</strong> {new Date(deploy.commit_timestamp ?? deploy.created_at).toLocaleString()}</p>

      {deploy.pull_request_number && (
        <p>
          <strong>Pull Request:</strong> #{deploy.pull_request_number} — {deploy.pull_request_title}
        </p>
      )}

      {deploy.repository_url && (
        <p>
          <strong>Repo:</strong>{" "}
          <a href={deploy.repository_url} target="_blank" rel="noopener noreferrer">
            {deploy.repository_full_name}
          </a>
        </p>
      )}

      {deploy.workflow && (
        <p>
          <strong>Workflow:</strong> {deploy.workflow} ({deploy.workflow_job})<br />
          {deploy.workflow_url && (
            <a href={deploy.workflow_url} target="_blank" rel="noopener noreferrer">
              Ver no GitHub Actions
            </a>
          )}
        </p>
      )}
    </Container>
  );
}

export default DeployDashboard;
