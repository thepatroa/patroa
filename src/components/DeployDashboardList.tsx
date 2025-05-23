import DeployDashboard from "./DeployDashboard";
import type { DeployDashboardProps } from "./DeployDashboardType.type";

type DeployListProps = {
  deploys: DeployDashboardProps["deploy"][];
};

function DeployList({ deploys }: DeployListProps) {
  return (
    <div>
      {deploys.map((deploy) => (
        <DeployDashboard key={deploy.id} deploy={deploy} />
      ))}
    </div>
  );
}

export default DeployList;
