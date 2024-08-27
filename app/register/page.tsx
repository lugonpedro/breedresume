import Link from "next/link";
import { RegisterForm } from "./register-form";

export default async function Register() {
  return (
    <>
      <RegisterForm />
      <Link href="/login">Já tenho uma conta</Link>
    </>
  );
}
