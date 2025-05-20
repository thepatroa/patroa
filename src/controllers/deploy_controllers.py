from sqlalchemy.orm import Session
from src import models, schemas

def create_deploy(db: Session, deploy_data: schemas.DeployCreate):
    deploy = models.Deploy(**deploy_data.dict())
    db.add(deploy)
    db.commit()
    db.refresh(deploy)
    return deploy

def list_deploys(db: Session):
    return db.query(models.Deploy).all()
