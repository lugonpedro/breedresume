interface IdAndCreatedProps {
  id: number;
  created_at: string;
}

interface ExperienceProps extends IdAndCreatedProps {
  title: string;
  years: number;
  user_id: string;
}

interface SkillProps extends IdAndCreatedProps {
  title: string;
  years: number;
  user_id: string;
}
