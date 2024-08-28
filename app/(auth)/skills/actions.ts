"use server";

import { createClient } from "@/utils/supabase/server-client";

interface ResponseType {
  data: Skill[];
  error: any;
}

export async function createSkill(
  title: string,
  years: number,
  user_id: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("skills")
    .insert({
      title,
      years: years ?? 0,
      user_id,
    })
    .select();

  return { data, error } as {
    data: Skill[];
    error: any;
  };
}

export async function readSkillsByUser(user_id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: true });

  return { data, error } as {
    data: Skill[];
    error: any;
  };
}

export async function updateSkill(id: string, title: string, years: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("skills")
    .update({
      title,
      years: years ?? 0,
    })
    .eq("id", id)
    .select();

  return { data, error } as {
    data: Skill[];
    error: any;
  };
}

export async function deleteSkill(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id)
    .select();

  return { data, error } as {
    data: Skill[];
    error: any;
  };
}
