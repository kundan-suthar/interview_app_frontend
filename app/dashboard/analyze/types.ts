export interface ResumeAnalysisResponse {
  full_name: string;
  current_job_title: string;
  experience: number; // in years
  experience_level: "Junior" | "Mid" | "Senior" | string;

  skills: string[];

  last_company: string;
  education: string;

  resume_summary: string;

  profile_match: number; // percentage (0–100)

  match_reasoning: string;

  matching_skills: string[];
  missing_skills: string[];
  required_job_title: string;
  recommendation:
    | "Recommended"
    | "Consider with Reservations"
    | "Not Recommended"
    | string;
}
export interface InterviewSessionResponse {
  session_id: string;
  duration_minutes: number;
}
