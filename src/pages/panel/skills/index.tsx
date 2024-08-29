import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContext } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSkill, readSkillsByUser } from "./actions";

type DataProps = {
  title: string;
  years: number;
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  const user = authContext((state) => state.user);

  useEffect(() => {
    async function readAll() {
      const res = await readSkillsByUser(user!.id);

      if (res.error) {
        return;
      }

      setSkills(res.data);
    }

    if (user) {
      readAll();
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>();

  async function add(data: DataProps) {
    const res = await createSkill(data.title, data.years, user!.id);

    if (res.error) {
      return;
    }

    setSkills((prevArray) => [...prevArray, res.data[0]]);
  }

  async function update() {
    // setMyArray(prevArray => prevArray.map(elemento => elemento === elementoParaAtualizar ? novoValor : elemento));
  }

  async function remove() {
    // setMyArray(prevArray => prevArray.filter(elemento => elemento !== elementoParaRemover));
  }

  return (
    <>
      <form onSubmit={handleSubmit(add)}>
        <div>
          <Label>Título</Label>
          <Input {...register("title", { required: true })} />
        </div>
        <div>
          <Label>Anos</Label>
          <Input {...register("years")} />
        </div>
        <Button type="submit">Adicionar</Button>
      </form>
      <div>
        <div>
          {skills.map((skill) => (
            <div className="text-black">{skill.title}</div>
          ))}
        </div>
      </div>
    </>
  );
}
