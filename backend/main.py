from fastapi import FastAPI
from routes.clients import router as client_router

app = FastAPI(title="Backend")

app.include_router(client_router)
