from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DeployCreate(BaseModel):
    commit_hash: str
    author: str
    branch: str
    status: str
    
    # Novos campos que você quer armazenar:
    commit_message: Optional[str] = None
    commit_timestamp: Optional[datetime] = None
    author_username: Optional[str] = None
    author_email: Optional[str] = None
    committer_name: Optional[str] = None
    committer_email: Optional[str] = None
    ref: Optional[str] = None
    base_ref: Optional[str] = None
    event_name: Optional[str] = None
    repository: Optional[str] = None
    repository_owner: Optional[str] = None
    repository_url: Optional[str] = None
    repository_full_name: Optional[str] = None
    workflow: Optional[str] = None
    workflow_job: Optional[str] = None
    workflow_run_id: Optional[int] = None
    workflow_run_number: Optional[int] = None
    workflow_url: Optional[str] = None
    pull_request_number: Optional[int] = None
    pull_request_title: Optional[str] = None
    pull_request_user: Optional[str] = None
    pull_request_base: Optional[str] = None
    pull_request_head: Optional[str] = None
    deployment_status: Optional[str] = None
    triggered_by: Optional[str] = None

class DeployOut(BaseModel):
    id: int
    commit_hash: str
    author: str
    branch: str
    status: str
    created_at: datetime
    
    # Também incluir os novos campos para retorno, caso queira
    commit_message: Optional[str] = None
    commit_timestamp: Optional[datetime] = None
    author_username: Optional[str] = None
    author_email: Optional[str] = None
    committer_name: Optional[str] = None
    committer_email: Optional[str] = None
    ref: Optional[str] = None
    base_ref: Optional[str] = None
    event_name: Optional[str] = None
    repository: Optional[str] = None
    repository_owner: Optional[str] = None
    repository_url: Optional[str] = None
    repository_full_name: Optional[str] = None
    workflow: Optional[str] = None
    workflow_job: Optional[str] = None
    workflow_run_id: Optional[int] = None
    workflow_run_number: Optional[int] = None
    workflow_url: Optional[str] = None
    pull_request_number: Optional[int] = None
    pull_request_title: Optional[str] = None
    pull_request_user: Optional[str] = None
    pull_request_base: Optional[str] = None
    pull_request_head: Optional[str] = None
    deployment_status: Optional[str] = None
    triggered_by: Optional[str] = None

    class Config:
        orm_mode = True
