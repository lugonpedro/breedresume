import { supabase } from "@/services/supabase";

export default async function Home() {
  const { data, error } = await supabase.from("countries").select();

  console.log(data, error);

  return <></>;
}
