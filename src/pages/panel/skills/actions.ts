import { supabase } from "@/services/supabase/client";

interface ResponseType {
  data: SkillProps[];
  error: any;
}

export async function createSkill(
  user_id: string,
  title: string,
  years: string
) {
  const { data, error } = await supabase
    .from("skills")
    .insert({
      user_id,
      title,
      years: years.length > 0 ? parseInt(years) : null,
    })
    .select();

  return { data, error } as ResponseType;
}

export async function readSkillById(id: string) {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id);

  return { data, error } as ResponseType;
}

export async function readSkillsByUser(user_id: string) {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: true });

  return { data, error } as ResponseType;
}

export async function updateSkill(id: number, title: string, years: string) {
  const { data, error } = await supabase
    .from("skills")
    .update({
      title,
      years: years ? parseInt(years) : null,
    })
    .eq("id", id)
    .select();

  return { data, error } as ResponseType;
}

export async function deleteSkill(id: number) {
  const { data, error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id)
    .select();

  return { data, error } as ResponseType;
}
