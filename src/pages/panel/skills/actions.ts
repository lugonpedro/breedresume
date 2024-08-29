import { supabase } from "@/services/supabase/client";

interface ResponseType {
  data: SkillProps[];
  error: any;
}

export async function createSkill(
  title: string,
  years: string,
  user_id: string
) {
  const { data, error } = await supabase
    .from("skills")
    .insert({
      title,
      years: years.length > 0 ? parseInt(years) : 1,
      user_id,
    })
    .select();

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

export async function updateSkill(id: string, title: string, years: number) {
  const { data, error } = await supabase
    .from("skills")
    .update({
      title,
      years: years ?? 0,
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
