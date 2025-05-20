from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.controllers import deploy_controllers
from src.schemas import deploy_schema

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/deploys", response_model=deploy_schema.DeployOut)
def create(deploy: deploy_schema.DeployCreate, db: Session = Depends(get_db)):
    return deploy_controllers.create_deploy(db, deploy)

@router.get("/deploys", response_model=list[deploy_schema.DeployOut])
def list_all(db: Session = Depends(get_db)):
    return deploy_controllers.list_deploys(db)
