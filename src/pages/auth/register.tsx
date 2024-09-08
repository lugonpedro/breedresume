import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>();

  const navigate = useNavigate();

  async function signUp(input: DataProps) {
    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });

    if (error) {
      // redirect("/error");
    }

    navigate("/experiences");
  }

  return (
    <div className="bg-primary text-secondary min-h-screen">
      <div className="p-4 max-w-[800px] mx-auto flex flex-col justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle className="text-start text-2xl font-semibold">
              Cadastre-se
            </CardTitle>
            <CardDescription>
              E veja como se torna fácil aplicar para vagas de emprego
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(signUp)}
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
              <Button type="submit">Cadastrar</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link to="/login" className="underline">
              Já tenho conta
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
