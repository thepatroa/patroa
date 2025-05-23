export interface DeployOut {
    id: number;
    commit_hash: string;
    author: string;
    branch: string;
    status: string;
    created_at: string;
    commit_message?: string;
    commit_timestamp?: string;
    author_username?: string;
    author_email?: string;
    committer_name?: string;
    committer_email?: string;
    ref?: string;
    base_ref?: string;
    event_name?: string;
    repository?: string;
    repository_owner?: string;
    repository_url?: string;
    repository_full_name?: string;
    workflow?: string;
    workflow_job?: string;
    workflow_run_id?: number;
    workflow_run_number?: number;
    workflow_url?: string;
    pull_request_number?: number;
    pull_request_title?: string;
    pull_request_user?: string;
    pull_request_base?: string;
    pull_request_head?: string;
    deployment_status?: string;
    triggered_by?: string;
  }
  
  export interface DeployDashboardProps {
    deploy: DeployOut;
  }
  