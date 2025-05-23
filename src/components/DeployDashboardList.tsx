import DeployDashboard from "./DeployDashboard";
import type { DeployDashboardProps } from "./DeployDashboardType.type";
import { GridContainer } from "./DeployDashboard.style";

type DeployListProps = {
  deploys: DeployDashboardProps["deploy"][];
};

function DeployList({ deploys }: DeployListProps) {
    return (
      <GridContainer>
        {deploys.map((deploy) => (
          <DeployDashboard key={deploy.id} deploy={deploy} />
        ))}
      </GridContainer>
    );
  }

export default DeployList;
