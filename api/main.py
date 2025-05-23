import os
from dotenv import load_dotenv 

load_dotenv() 

import pandas as pd
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("A variável de ambiente GEMINI_API_KEY não está definida.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("models/gemini-1.5-flash")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def ler_csv(upload_file: UploadFile) -> pd.DataFrame:
    try:
        df = pd.read_csv(upload_file.file)
        return df
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao ler CSV: {str(e)}")

def categorizar_gastos(df: pd.DataFrame) -> str:
    texto_gastos = df.to_string(index=False)

    prompt = f"""
Você é um assistente financeiro. Abaixo está uma lista de gastos do cartão de crédito.
Sua tarefa é categorizar cada gasto com base na descrição e gerar uma listagem organizada no seguinte formato:

Data | Descrição | Valor | Categoria

Exemplos de categorias: Alimentação, Transporte, Assinaturas, Lazer, Compras, Saúde, Outros.

Dados:
{texto_gastos}
"""

    response = model.generate_content(prompt)
    return response.text

@app.post("/categorizar/")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="O arquivo deve ser um CSV.")

    df = ler_csv(file)
    resultado = categorizar_gastos(df)

    return JSONResponse(content={"resultado": resultado})
