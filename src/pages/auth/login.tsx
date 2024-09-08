import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Card>
            <CardHeader>
              <CardTitle className="text-start text-2xl font-semibold">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(login)}
                className="flex flex-col gap-4"
              >
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
                <Button type="submit">Entrar</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link to="/register" className="underline">
                Criar Conta
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
