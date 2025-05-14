from fastapi import FastAPI
from routes.clients import router as clients_router

app = FastAPI(title="Backend")

app.include_router(clients_router)
