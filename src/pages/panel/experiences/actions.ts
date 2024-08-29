import { supabase } from "@/services/supabase/client";

interface ResponseType {
  data: ExperienceProps[];
  error: any;
}

export async function createExperience(
  user_id: string,
  company: string,
  occupation: string,
  start_date: string,
  end_date: string,
  description: string,
  skills_in_experience: string[]
) {
  const { data, error } = await supabase
    .from("experiences")
    .insert({
      user_id,
      company,
      occupation,
      start_date,
      end_date: end_date.length > 0 ? end_date : null,
      description: description.length > 0 ? description : null,
    })
    .select();

  if (error) {
    return { data, error };
  }

  if (skills_in_experience.length > 0) {
    let formattedSkills = skills_in_experience.map((skill) => {
      return { skill_id: skill, experience_id: data[0].id };
    });

    await supabase.from("skills_in_experience").insert(formattedSkills);
  }

  return { data, error } as ResponseType;
}

export async function readExperiencesByUser(user_id: string) {
  const { data, error } = await supabase
    .from("experiences")
    .select("*, skills (title)")
    .eq("user_id", user_id)
    .order("id", { ascending: true });

  return { data, error } as ResponseType;
}

export async function updateExperience(
  id: string,
  company: string,
  occupation: string,
  start_date: string,
  end_date: string,
  description: string
) {
  const { data, error } = await supabase
    .from("experiences")
    .update({
      company,
      occupation,
      start_date,
      end_date: end_date.length > 0 ? end_date : null,
      description: description.length > 0 ? description : null,
    })
    .eq("id", id)
    .select();

  return { data, error } as ResponseType;
}

export async function deleteExperience(id: number) {
  const { data, error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", id)
    .select();

  return { data, error } as ResponseType;
}
