from pydantic import BaseModel
from datetime import datetime

class DeployCreate(BaseModel):
    commit_hash: str
    author: str
    branch: str
    status: str

class DeployOut(BaseModel):
    id: int
    commit_hash: str
    author: str
    branch: str
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
