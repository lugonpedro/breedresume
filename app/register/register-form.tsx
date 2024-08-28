"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { register as registerAction } from "./actions";

type Inputs = {
  email: string;
  password: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    registerAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
  );
}
