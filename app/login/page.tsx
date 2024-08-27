import Link from "next/link";
import { LoginForm } from "./components/form";

export default async function Login() {
  return (
    <>
      <LoginForm />
      <Link href="/register">Criar Conta</Link>
    </>
  );
}
