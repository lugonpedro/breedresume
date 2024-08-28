import Link from "next/link";
import { RegisterForm } from "./register-form";

export default async function Register() {
  return (
    <div className="bg-slate-100 text-black min-h-screen">
      <div className="p-4 max-w-[800px] mx-auto flex flex-col justify-center h-screen">
        <p className="text-2xl text-center font-semibold">Cadastre-se</p>
        <RegisterForm />
        <Link href="/login" className="mt-2 underline text-end">
          Já tenho conta
        </Link>
      </div>
    </div>
  );
}
