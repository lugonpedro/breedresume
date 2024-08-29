import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContext } from "@/contexts/auth-context";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSkill, deleteSkill, readSkillsByUser } from "./actions";

type DataProps = {
  title: string;
  years: string;
};

export default function Skills() {
  const [skills, setSkills] = useState<SkillProps[]>([]);

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
    reset,
    formState: { errors },
  } = useForm<DataProps>();

  async function add(data: DataProps) {
    const res = await createSkill(data.title, data.years, user!.id);

    if (res.error) {
      return;
    }

    reset();
    setSkills((prevArray) => [...prevArray, res.data[0]]);
  }

  async function update(skill: SkillProps) {
    // setMyArray(prevArray => prevArray.map(elemento => elemento === elementoParaAtualizar ? novoValor : elemento));
  }

  async function remove(id: number) {
    const res = await deleteSkill(id);

    if (res.error) {
      return;
    }

    setSkills((prevArray) => prevArray.filter((el) => el.id !== id));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(add)}
        className="flex flex-col gap-4 text-secondary"
      >
        <div>
          <Label>Título</Label>
          <Input {...register("title", { required: true })} />
        </div>
        <div>
          <Label>Anos</Label>
          <Input {...register("years")} />
        </div>
        <Button
          type="submit"
          className="bg-secondary text-primary hover:bg-secondary/80"
        >
          Adicionar
        </Button>
      </form>
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-black text-secondary p-4 rounded-xl"
            >
              <div className="flex justify-between gap-6">
                <div>
                  <p>{skill.title}</p>
                  {skill.years && (
                    <p>
                      {skill.years} {skill.years > 1 ? "anos" : "ano"}
                    </p>
                  )}
                </div>
                <div className="self-end">
                  <Trash
                    onClick={() => remove(skill.id)}
                    className="cursor-pointer bg-secondary text-black rounded-full p-0.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
