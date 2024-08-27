"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server-client";

export async function register(form: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: form.get("email") as string,
    password: form.get("password") as string,
  });

  if (error) {
    // redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
