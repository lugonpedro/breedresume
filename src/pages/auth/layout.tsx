import { authContext } from "@/contexts/auth-context";
import { supabase } from "@/services/supabase/client";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        return;
      }

      authContext.setState({
        user: { ...data.user! },
      });

      navigate("/dashboard");
    }

    getUser();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
