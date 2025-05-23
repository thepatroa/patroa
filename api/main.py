import os
import pandas as pd
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# === Configurar chave da API do Gemini ===
genai.configure(api_key="AIzaSyD6aOsxl__esiDPnyJVHoOb0w7q8m0MM4E")
model = genai.GenerativeModel("models/gemini-1.5-flash")

# === Inicializar FastAPI ===
app = FastAPI()

# === Configurar CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ou ["*"] para permitir tudo (não recomendado em produção)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Função para ler CSV ===
def ler_csv(upload_file: UploadFile) -> pd.DataFrame:
    try:
        df = pd.read_csv(upload_file.file)
        return df
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao ler CSV: {str(e)}")

# === Função para categorizar os gastos com Gemini ===
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

# === Rota principal ===
@app.post("/categorizar/")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="O arquivo deve ser um CSV.")

    df = ler_csv(file)
    resultado = categorizar_gastos(df)

    return JSONResponse(content={"resultado": resultado})
