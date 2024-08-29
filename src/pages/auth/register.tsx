import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/services/supabase/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type DataProps = {
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>();

  async function add(input: DataProps) {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });

    if (error) {
      // redirect("/error");
    }

    // revalidatePath("/", "layout");
    // redirect("/dashboard");
  }

  return (
    <div className="bg-slate-100 text-black min-h-screen">
      <div className="p-4 max-w-[800px] mx-auto flex flex-col justify-center h-screen">
        <p className="text-2xl text-center font-semibold">Cadastre-se</p>
        <form onSubmit={handleSubmit(add)} className="flex flex-col gap-4">
          <div>
            <Label>E-mail</Label>
            <Input {...register("email")} placeholder="E-mail" />
          </div>
          <div>
            <Label>Senha</Label>
            <Input
              {...register("password", { required: true })}
              placeholder="Senha"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
        <Link to="/login" className="mt-2 underline text-end">
          Já tenho conta
        </Link>
      </div>
    </div>
  );
}
