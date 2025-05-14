from pydantic import BaseModel

class ClientInput(BaseModel):
    nome: str
    faturamento_mensal: float
    custo_operacional: float
    impostos: float
    clientes_ativos: int
    clientes_totais: int

class ClientOutput(ClientInput):
    lucro_bruto: float
    lucro_liquido: float
    ticket_medio: float
    taxa_ativacao: float
