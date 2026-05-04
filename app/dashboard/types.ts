export interface DashboardResponse {
    current_user_interviews: number;
    current_user_completed_interviews: number;
    table_data: InterviewTableItem[];
    hirability_score: number;
}

export interface InterviewTableItem {
    id: number;
    thread_id: string;
    status: "completed" | "pending" | "in_progress"; // extend if needed
    created_at: string; // ISO date string
    required_job_title: string;
    profile_match: number;
    full_name: string;
}