import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dashboard.css";

interface Metrics {
  id: number;
  gross_revenue: number;
  net_revenue: number;
  gross_profit: number;
  net_profit: number;
  gross_profit_margin: number;
  net_profit_margin: number;
  cash_flow: number;
  ebitda: number;
  break_even_point: number;
  valuation: number;
  active_clients: number;
  client_retention_rate: number;
  churn_rate: number;
  average_ticket_size: number;
  lifetime_value: number;
  customer_acquisition_cost: number;
  cac_payback_period: number;
  net_promoter_score: number;
  monthly_recurring_revenue: number;
  annual_recurring_revenue: number;
  recurring_revenue_percentage: number;
  revenue_by_client_segment: string;
  team_utilization_rate: number;
  average_service_delivery_time: number;
  rework_rate: number;
  monthly_revenue_growth: number;
  active_client_growth: number;
}

const Dashboard = () => {
  const [data, setData] = useState<Metrics | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get<Metrics[]>("/");
      setData(response.data[0]);
    }
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="charts-row">
        <div className="chart-container">
          <h2>Gross vs Net Revenue</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={[
                { name: "Gross Revenue", value: data.gross_revenue },
                { name: "Net Revenue", value: data.net_revenue },
              ]}
            >
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Gross vs Net Profit</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={[
                { name: "Gross Profit", value: data.gross_profit },
                { name: "Net Profit", value: data.net_profit },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Retention vs Churn Rates</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "Retention", value: data.client_retention_rate },
                  { name: "Churn", value: data.churn_rate },
                ]}
                dataKey="value"
                outerRadius={60}
                label
              >
                {[
                  { name: "Retention", color: "#00C49F" },
                  { name: "Churn", color: "#FF8042" },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
