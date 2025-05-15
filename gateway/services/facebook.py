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

def format_budget(value):
    if value:
        return round(int(value) / 100, 2)
    return None

def get_facebook_campaigns():
    proof = generate_appsecret_proof(ACCESS_TOKEN, APP_SECRET)
    url = f"https://graph.facebook.com/{GRAPH_VERSION}/{AD_ACCOUNT_ID}/campaigns"

    params = {
        "fields": ",".join([
            "id", "name", "status", "objective",
            "start_time", "stop_time", "configured_status",
            "daily_budget", "lifetime_budget",
            "created_time", "updated_time"
        ]),
        "access_token": ACCESS_TOKEN,
        "appsecret_proof": proof
    }

    response = requests.get(url, params=params)
    data = response.json()

    if "error" in data:
        raise Exception(data["error"]["message"])

    campaigns = []
    for c in data.get("data", []):
        campaigns.append({
            "id": c.get("id"),
            "name": c.get("name"),
            "objective": c.get("objective"),
            "status": c.get("status"),
            "configured_status": c.get("configured_status"),
            "start_time": c.get("start_time"),
            "stop_time": c.get("stop_time"),
            "daily_budget": format_budget(c.get("daily_budget")),
            "lifetime_budget": format_budget(c.get("lifetime_budget")),
            "created_time": c.get("created_time"),
            "updated_time": c.get("updated_time"),
        })

    return campaigns
