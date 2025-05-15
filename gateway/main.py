from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.facebook import obter_visao_geral_campanhas

app = FastAPI()

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Pode adicionar outros domínios aqui
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/facebook/campanhas", tags=["Facebook Ads"])
def campanhas():
    try:
        return obter_visao_geral_campanhas()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
