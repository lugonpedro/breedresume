import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/services/supabase/client";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type DataProps = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>();

  const navigate = useNavigate();

  async function login(input: DataProps) {
    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      // redirect("/error");
    }

    navigate("/experiences");
  }

  return (
    <>
      <div className="bg-primary text-secondary min-h-screen">
        <div className="p-4 max-w-[800px] mx-auto flex flex-col justify-center h-screen">
          <p className="text-2xl text-center font-semibold">Login</p>
          <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
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
            <Button
              type="submit"
              className="bg-secondary text-primary hover:bg-secondary/80"
            >
              Entrar
            </Button>
          </form>
          <Link
            to="/register"
            className="mt-2 underline text-end text-secondary"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </>
  );
}
