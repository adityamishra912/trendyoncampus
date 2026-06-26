export type CAUser = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  college: string | null;
  branch: string | null;
  year: string | null;
  linkedin: string | null;
  ca_id: string;
  role: string;
  tier: string;
  points: number;
  credits: number;
  referral_code: string;
  created_at: string;
};

export type TaskStatus = "locked" | "unlocked" | "pending_review" | "approved" | "rejected";

export type Task = {
  id: string;
  title: string;
  description: string;
  points: number;
  credits: number;
  deadline: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: TaskStatus;
  proof_required: string[];
  domain: string;
};
