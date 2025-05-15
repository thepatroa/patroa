from fastapi import FastAPI, HTTPException
from services.facebook import obter_visao_geral_campanhas

app = FastAPI()

@app.get("/facebook/campanhas", tags=["Facebook Ads"])
def campanhas():
    try:
        return obter_visao_geral_campanhas()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
