import { authContext } from "@/contexts/auth-context";
import { supabase } from "./client";

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    // console.log(error)
  }

  authContext.setState({
    user: null,
  });
}
