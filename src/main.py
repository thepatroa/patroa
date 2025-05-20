from fastapi import FastAPI
from src.routes import deploy_routes
from src.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(deploy_routes.router)
