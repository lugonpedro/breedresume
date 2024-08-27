import { createClient } from "@/utils/supabase/server-client";

export default async function Dashboard() {
  const supabase = createClient();

  // async function logout() {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      {/* <p>Hello {data.user.email}</p>
       */}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
}
