from fastapi import FastAPI, HTTPException
from models import StartupMetrics
from typing import List
import json
import os

app = FastAPI(title="Startup ERP API")

DATA_FILE = "data.json"


def read_data() -> List[dict]:
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)


def write_data(data: List[dict]) -> None:
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


@app.get("/startups", response_model=List[StartupMetrics])
def get_startups():
    data = read_data()
    return data


@app.post("/startups", response_model=StartupMetrics)
def create_startup(startup: StartupMetrics):
    data = read_data()

    if any(s["id"] == startup.id for s in data):
        raise HTTPException(status_code=400, detail="ID already exists.")
    data.append(startup.dict())
    write_data(data)
    return startup
