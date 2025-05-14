from fastapi import APIRouter
from schemas.clients import ClientInput, ClientOutput
from services.client_metrics import calcular_metricas
import uuid

router = APIRouter(prefix="/clientes", tags=["Clientes"])

clientes_db: list[ClientOutput] = []

@router.post("/calcular", response_model=ClientOutput)
def calcular_dados(cliente: ClientInput):
    metricas = calcular_metricas(cliente)
    resultado = ClientOutput(
        **metricas,
        clientes=cliente.clientes
    )
    clientes_db.append(resultado)
    return resultado

@router.get("", response_model=list[ClientOutput])
def listar_clientes():
    return clientes_db
