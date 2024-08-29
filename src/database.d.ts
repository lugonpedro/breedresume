interface DefaultSupabaseIdAndCreated {
  id: number;
  created_at: string;
}

interface Skill extends DefaultSupabaseIdAndCreated {
  title: string;
  years: number;
  user_id: string;
}
