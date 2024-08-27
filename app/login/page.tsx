import Link from "next/link";
import { LoginForm } from "./login-form";

export default async function Login() {
  return (
    <>
      <LoginForm />
      <Link href="/register">Criar Conta</Link>
    </>
  );
}
