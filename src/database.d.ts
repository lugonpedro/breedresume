interface IdAndCreatedProps {
  id: number;
  created_at: string;
}

interface ExperienceProps extends IdAndCreatedProps {
  company: string;
  occupation: string;
  start_date: string;
  end_date?: string;
  description?: string;
  user_id: string;
}

interface SkillProps extends IdAndCreatedProps {
  title: string;
  years: string;
  user_id: string;
}
