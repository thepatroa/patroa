from fastapi import FastAPI
from src.routes import deploy_routes
from src.database import Base, engine

import uvicorn

app = FastAPI()

Base.metadata.create_all(bind=engine)
app.include_router(deploy_routes.router)

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
