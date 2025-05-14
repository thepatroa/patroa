from pydantic import BaseModel, Field, model_validator
from typing import List, Literal
import uuid


class ClientDetalhe(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nome: str
    tipo: Literal['MEI', 'Microempresa', 'Pequena Empresa']
    empresa: str
    email: str
    leads: int
    cpa: float
    roas: float
    conversao: float
    mensalidade: float
    canal: str
    descricao: str
    duracao: int

class ClientInput(BaseModel):
    faturamento_mensal: float
    total_clientes: int
    clientes_ativos: int
    leads_mes_passado: int
    numero_funcionarios: int
    tipo_empresa: Literal['MEI', 'Microempresa', 'Pequena Empresa']
    preco_servico: float
    clientes: List[ClientDetalhe]

    @model_validator(mode="after")
    def validar_ativos_iguais_tamanho_lista(self) -> "ClientInput":
        if len(self.clientes) != self.clientes_ativos:
            raise ValueError("O número de clientes ativos deve ser igual ao número de clientes enviados.")
        return self

class ClientOutput(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    faturamento_anual: float
    lucro_anual: float
    custo_impostos_anual: float
    clientes_ativos: int
    total_clientes: int
    valuation: float
    lucro_bruto: float
    lucro_liquido: float
    ltv_medio: float
    ltv_total: float
    numero_funcionarios: int
    clientes: List[ClientDetalhe]
