"use client";

import { supabase } from "@/services/supabase";
import { useForm } from "react-hook-form";

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

  async function signIn(inputs: Inputs) {
    console.log(inputs);
    const res = await supabase.auth.signUp({
      email: inputs.email,
      password: inputs.password,
    });
    console.log(res);
  }

  return (
    <>
      <form onSubmit={handleSubmit(signIn)}>
        <input {...register("email")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
      {/* <form>
        <label>Email:</label>
        <input type="email" id="email" name="email" />

        <label>Senha:</label>
        <input type="password" id="senha" name="senha" />
        <button onClick={register} type="button">
          Enviar
        </button>
      </form> */}
    </>
  );
}
