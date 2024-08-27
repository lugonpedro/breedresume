import { createClient } from "@/utils/supabase/server-client";

export default async function Dashboard() {
  const supabase = createClient();

  return (
    <div>
      {/* <p>Hello {data.user.email}</p>
       */}
    </div>
  );
}
