import { authContext } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { supabase } from "./client";

export async function logout() {
  const navigate = useNavigate();

  const { error } = await supabase.auth.signOut();
  if (error) {
    // console.log(error);
  }

  authContext.setState({
    user: null,
  });
  navigate("/login");
}
