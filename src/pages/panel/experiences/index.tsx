import { authContext } from "@/contexts/auth-context";

type Input = {
  title: string;
  years: number;
};

export default function Experiences() {
  const user = authContext((state) => state.user);

  console.log(user);

  return (
    <>
      <p>Experiences</p>
    </>
  );
}
