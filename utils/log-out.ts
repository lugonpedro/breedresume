"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server-client";

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    // console.log(error);
  }

  redirect("/login");
}
