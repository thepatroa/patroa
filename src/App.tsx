import { useEffect, useState } from "react";
import DeployList from "./components/DeployDashboardList";

function App() {
  const [deploys, setDeploys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/deploys")
      .then((res) => res.json())
      .then((data) => setDeploys(data));
  }, []);

  return <DeployList deploys={deploys} />;
}

export default App;
