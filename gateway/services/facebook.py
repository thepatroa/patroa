import os
import hmac
import hashlib
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

SEGREDO_DO_APP = os.getenv("META_APP_SECRET")
TOKEN_DE_ACESSO = os.getenv("META_ACCESS_TOKEN")
ID_CONTA_ANUNCIOS = os.getenv("META_AD_ACCOUNT_ID")
VERSAO_GRAPH = "v18.0"

# Cotação fixa para BRL (R$) — ajuste conforme necessidade
COTACAO_DOLAR_PARA_REAL = 5.00

def gerar_appsecret_proof(token, segredo):
    return hmac.new(
        segredo.encode("utf-8"),
        msg=token.encode("utf-8"),
        digestmod=hashlib.sha256
    ).hexdigest()

def formatar_orcamento(valor):
    if valor:
        return round(int(valor) / 100, 2)
    return None

def obter_tipo_criativo(id_criativo, proof):
    url = f"https://graph.facebook.com/{VERSAO_GRAPH}/{id_criativo}"
    params = {
        "fields": "object_story_spec",
        "access_token": TOKEN_DE_ACESSO,
        "appsecret_proof": proof
    }
    resposta = requests.get(url, params=params)
    dados = resposta.json()
    try:
        dados_link = dados["object_story_spec"].get("link_data", {})
        if "video_id" in dados_link or "video_data" in dados_link:
            return "vídeo"
        elif "image_hash" in dados_link or "image_url" in dados_link:
            return "imagem"
    except:
        return "desconhecido"
    return "desconhecido"

def obter_gasto_mensal():
    hoje = datetime.today()
    inicio_mes = hoje.replace(day=1).strftime("%Y-%m-%d")
    hoje_formatado = hoje.strftime("%Y-%m-%d")

    proof = gerar_appsecret_proof(TOKEN_DE_ACESSO, SEGREDO_DO_APP)
    url = f"https://graph.facebook.com/{VERSAO_GRAPH}/{ID_CONTA_ANUNCIOS}/insights"

    params = {
        "fields": "spend",
        "access_token": TOKEN_DE_ACESSO,
        "appsecret_proof": proof,
        "level": "account",
        "time_range": f"{{\"since\":\"{inicio_mes}\",\"until\":\"{hoje_formatado}\"}}"
    }

    response = requests.get(url, params=params)
    dados = response.json()

    if "error" in dados:
        raise Exception(dados["error"]["message"])

    gasto_total = 0.0
    for linha in dados.get("data", []):
        gasto = float(linha.get("spend", 0.0))
        gasto_total += gasto

    return round(gasto_total * COTACAO_DOLAR_PARA_REAL, 2)

def obter_visao_geral_campanhas():
    proof = gerar_appsecret_proof(TOKEN_DE_ACESSO, SEGREDO_DO_APP)
    url_campanhas = f"https://graph.facebook.com/{VERSAO_GRAPH}/{ID_CONTA_ANUNCIOS}/campaigns"

    parametros = {
        "fields": ",".join([
            "id", "name", "status", "objective",
            "start_time", "stop_time", "configured_status",
            "daily_budget", "lifetime_budget",
            "created_time", "updated_time"
        ]),
        "access_token": TOKEN_DE_ACESSO,
        "appsecret_proof": proof
    }

    resposta_campanhas = requests.get(url_campanhas, params=parametros)
    dados_campanhas = resposta_campanhas.json()

    if "error" in dados_campanhas:
        raise Exception(dados_campanhas["error"]["message"])

    campanhas = []
    quantidade_ativas = 0

    for campanha in dados_campanhas.get("data", []):
        if campanha.get("status") == "ACTIVE":
            quantidade_ativas += 1

        # Buscar anúncios da campanha
        url_anuncios = f"https://graph.facebook.com/{VERSAO_GRAPH}/{campanha['id']}/ads"
        params_anuncios = {
            "fields": "id,name,status,creative",
            "access_token": TOKEN_DE_ACESSO,
            "appsecret_proof": proof
        }

        resposta_anuncios = requests.get(url_anuncios, params=params_anuncios)
        dados_anuncios = resposta_anuncios.json()
        anuncios = []
        anuncios_ativos = 0

        if "data" in dados_anuncios:
            for anuncio in dados_anuncios["data"]:
                status_anuncio = anuncio.get("status")
                tipo_criativo = "desconhecido"

                if anuncio.get("creative") and anuncio["creative"].get("id"):
                    id_criativo = anuncio["creative"]["id"]
                    tipo_criativo = obter_tipo_criativo(id_criativo, proof)

                if status_anuncio == "ACTIVE":
                    anuncios_ativos += 1

                anuncios.append({
                    "id": anuncio["id"],
                    "nome": anuncio["name"],
                    "status": "ATIVO" if status_anuncio == "ACTIVE" else "PAUSADO",
                    "tipo": tipo_criativo
                })

        campanhas.append({
            "id": campanha["id"],
            "nome": campanha["name"],
            "objetivo": campanha.get("objective", "").replace("MESSAGES", "MENSAGENS"),
            "status": "ATIVA" if campanha.get("status") == "ACTIVE" else "PAUSADA",
            "status_configurado": "ATIVA" if campanha.get("configured_status") == "ACTIVE" else "PAUSADA",
            "inicio": campanha.get("start_time"),
            "fim": campanha.get("stop_time"),
            "orcamento_diario": formatar_orcamento(campanha.get("daily_budget")),
            "orcamento_total": formatar_orcamento(campanha.get("lifetime_budget")),
            "criada_em": campanha.get("created_time"),
            "atualizada_em": campanha.get("updated_time"),
            "tipo_de_orcamento": "diário" if campanha.get("daily_budget") else "vitalício",
            "quantidade_de_anuncios_ativos": anuncios_ativos,
            "anuncios": anuncios
        })

    return {
        "campanhas_ativas": quantidade_ativas,
        "total_de_campanhas": len(campanhas),
        "gasto_mensal_reais": obter_gasto_mensal(),
        "campanhas": campanhas
    }
