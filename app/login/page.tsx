import Link from "next/link";
import { LoginForm } from "./login-form";

export default async function Login() {
  return (
    <div className="bg-slate-100 text-black min-h-screen">
      <div className="p-4 max-w-[800px] mx-auto flex flex-col justify-center h-screen">
        <p className="text-2xl text-center font-semibold">Login</p>
        <LoginForm />
        <Link href="/register" className="mt-2 underline text-end">
          Criar Conta
        </Link>
      </div>
    </div>
  );
}
