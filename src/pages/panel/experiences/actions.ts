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
  const { data: experienceData, error: errorData } = await supabase
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

  if (errorData) {
    return { data: experienceData, error: errorData };
  }

  if (skills_in_experience.length > 0) {
    await createSkillsInExperience(skills_in_experience, experienceData[0].id);
  }

  const { data, error } = await readExperienceById(experienceData[0].id);

  return { data, error };
}

export async function readExperienceById(id: string) {
  const { data, error } = await supabase
    .from("experiences")
    .select("*, skills (id, title)")
    .eq("id", id);

  return { data, error } as ResponseType;
}

export async function readExperiencesByUser(user_id: string) {
  const { data, error } = await supabase
    .from("experiences")
    .select("*, skills (id, title)")
    .eq("user_id", user_id)
    .order("start_date", { ascending: false });

  return { data, error } as ResponseType;
}

export async function updateExperience(
  id: number,
  company: string,
  occupation: string,
  start_date: string,
  end_date: string,
  description: string,
  previous_skills_in_experience: string[],
  skills_in_experience: string[]
) {
  const { data: experienceData, error: errorData } = await supabase
    .from("experiences")
    .update({
      company,
      occupation,
      start_date,
      end_date: end_date ?? null,
      description: description ?? null,
    })
    .eq("id", id)
    .select();

  if (errorData) {
    return { data: experienceData, error: errorData };
  }

  if (skills_in_experience.length > 0) {
    await updateSkillsInExperience(
      previous_skills_in_experience,
      skills_in_experience,
      experienceData[0].id
    );
  }

  const { data, error } = await readExperienceById(experienceData[0].id);

  return { data, error };
}

export async function deleteExperience(id: number) {
  const { data, error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", id)
    .select();

  return { data, error } as ResponseType;
}

async function createSkillsInExperience(
  skills: string[],
  experience_id: string
) {
  let formattedSkills = skills.map((skill) => {
    return { skill_id: skill, experience_id };
  });

  const { data: dataSkills, error: errorSkills } = await supabase
    .from("skills_in_experience")
    .insert(formattedSkills);

  if (errorSkills) {
    return { dataSkills, errorSkills };
  }
}

async function updateSkillsInExperience(
  previousSkills: string[],
  skills: string[],
  experience_id: string
) {
  const addedSkills = skills.filter((skill) => !previousSkills.includes(skill));

  await createSkillsInExperience(addedSkills, experience_id);

  const removedSkills = previousSkills.filter(
    (skill) => !skills.includes(skill)
  );

  const { data: dataSkills, error: errorSkills } = await supabase
    .from("skills_in_experience")
    .delete()
    .eq("experience_id", experience_id)
    .in("skill_id", removedSkills);

  if (errorSkills) {
    return { dataSkills, errorSkills };
  }
}
