from sqlalchemy import Column, Integer, String, DateTime
from src.database import Base
from datetime import datetime

class Deploy(Base):
    __tablename__ = "deploys"

    id = Column(Integer, primary_key=True, index=True)
    commit_hash = Column(String, index=True)
    author = Column(String)
    branch = Column(String)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
