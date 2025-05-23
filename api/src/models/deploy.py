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
    
    # Novas colunas para armazenar os campos extras
    commit_message = Column(String, nullable=True)
    commit_timestamp = Column(DateTime, nullable=True)
    author_username = Column(String, nullable=True)
    author_email = Column(String, nullable=True)
    committer_name = Column(String, nullable=True)
    committer_email = Column(String, nullable=True)
    ref = Column(String, nullable=True)
    base_ref = Column(String, nullable=True)
    event_name = Column(String, nullable=True)
    repository = Column(String, nullable=True)
    repository_owner = Column(String, nullable=True)
    repository_url = Column(String, nullable=True)
    repository_full_name = Column(String, nullable=True)
    workflow = Column(String, nullable=True)
    workflow_job = Column(String, nullable=True)
    workflow_run_id = Column(Integer, nullable=True)
    workflow_run_number = Column(Integer, nullable=True)
    workflow_url = Column(String, nullable=True)
    pull_request_number = Column(Integer, nullable=True)
    pull_request_title = Column(String, nullable=True)
    pull_request_user = Column(String, nullable=True)
    pull_request_base = Column(String, nullable=True)
    pull_request_head = Column(String, nullable=True)
    deployment_status = Column(String, nullable=True)
    triggered_by = Column(String, nullable=True)
