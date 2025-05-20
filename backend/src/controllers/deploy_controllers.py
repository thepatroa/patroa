from sqlalchemy.orm import Session
from src.models import deploy
from src.schemas import deploy_schema

def create_deploy(db: Session, deploy_data: deploy_schema.DeployCreate):
    new_deploy = deploy.Deploy(**deploy_data.dict())
    db.add(new_deploy)
    db.commit()
    db.refresh(new_deploy)
    return new_deploy

def list_deploys(db: Session):
    return db.query(deploy.Deploy).all()
