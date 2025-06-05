from pydantic import BaseModel
from typing import Optional


class StartupMetrics(BaseModel):
    id: int
    gross_revenue: float
    net_revenue: float
    gross_profit: float
    net_profit: float
    gross_profit_margin: float
    net_profit_margin: float
    cash_flow: float
    ebitda: float
    break_even_point: float
    valuation: float
    active_clients: int
    client_retention_rate: float
    churn_rate: float
    average_ticket_size: float
    lifetime_value: float
    customer_acquisition_cost: float
    cac_payback_period: float
    net_promoter_score: float
    monthly_recurring_revenue: float
    annual_recurring_revenue: float
    recurring_revenue_percentage: float
    revenue_by_client_segment: str
    team_utilization_rate: float
    average_service_delivery_time: float
    rework_rate: float
    monthly_revenue_growth: float
    active_client_growth: float
