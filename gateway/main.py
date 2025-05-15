import os
import hmac
import hashlib
import requests
from dotenv import load_dotenv

load_dotenv()

APP_SECRET = os.getenv("META_APP_SECRET")
ACCESS_TOKEN = os.getenv("META_ACCESS_TOKEN")
AD_ACCOUNT_ID = os.getenv("META_AD_ACCOUNT_ID")
GRAPH_VERSION = "v18.0"

def generate_appsecret_proof(token, secret):
    return hmac.new(
        secret.encode("utf-8"),
        msg=token.encode("utf-8"),
        digestmod=hashlib.sha256
    ).hexdigest()

proof = generate_appsecret_proof(ACCESS_TOKEN, APP_SECRET)

BASE_URL = f"https://graph.facebook.com/{GRAPH_VERSION}/{AD_ACCOUNT_ID}/campaigns"

params = {
    "fields": ",".join([
        "id",
        "name",
        "status",
        "objective",
        "start_time",
        "stop_time",
        "configured_status",
        "daily_budget",
        "lifetime_budget",
        "created_time",
        "updated_time"
    ]),
    "access_token": ACCESS_TOKEN,
    "appsecret_proof": proof
}

response = requests.get(BASE_URL, params=params)
data = response.json()

def format_budget(value):
    if value:
        return f"R${int(value) / 100:.2f}"
    return "Não definido"

if "error" in data:
    print("❌ Erro:", data["error"]["message"])
else:
    print("📊 Detalhes das campanhas:")
    for campaign in data["data"]:
        print("─" * 40)
        print(f"🆔 ID: {campaign['id']}")
        print(f"📛 Nome: {campaign['name']}")
        print(f"🎯 Objetivo: {campaign.get('objective', 'N/A')}")
        print(f"📆 Início: {campaign.get('start_time', 'N/A')}")
        print(f"📅 Fim: {campaign.get('stop_time', 'N/A')}")
        print(f"📍 Status atual: {campaign.get('status')}")
        print(f"⚙️ Status configurado: {campaign.get('configured_status')}")
        print(f"💰 Orçamento diário: {format_budget(campaign.get('daily_budget'))}")
        print(f"💼 Orçamento total: {format_budget(campaign.get('lifetime_budget'))}")
        print(f"🕐 Criada em: {campaign.get('created_time')}")
        print(f"🔄 Atualizada em: {campaign.get('updated_time')}")
