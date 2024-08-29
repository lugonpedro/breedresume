import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContext } from "@/contexts/auth-context";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createExperience,
  deleteExperience,
  readExperiencesByUser,
} from "./actions";

export default function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);

  const user = authContext((state) => state.user);

  useEffect(() => {
    async function readAll() {
      const res = await readExperiencesByUser(user!.id);

      if (res.error) {
        return;
      }

      console.log(res.data);

      setExperiences(res.data);
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
  } = useForm<ExperienceProps>();

  async function add(data: ExperienceProps) {
    const res = await createExperience(
      user!.id,
      data.company,
      data.occupation,
      data.start_date,
      data.end_date,
      data.description,
      data.skills_in_experience
    );

    console.log(res);

    if (res.error) {
      return;
    }

    reset();
    setExperiences((prevArray) => [...prevArray, res.data[0]]);
  }

  async function update(skill: SkillProps) {
    // setMyArray(prevArray => prevArray.map(elemento => elemento === elementoParaAtualizar ? novoValor : elemento));
  }

  async function remove(id: number) {
    const res = await deleteExperience(id);

    if (res.error) {
      return;
    }

    setExperiences((prevArray) => prevArray.filter((el) => el.id !== id));
  }

  return (
    <>
      <form onSubmit={handleSubmit(add)} className="text-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Empresa</Label>
            <Input
              {...register("company", { required: true })}
              placeholder="Empresa"
            />
          </div>
          <div>
            <Label>Posição</Label>
            <Input
              {...register("occupation", { required: true })}
              placeholder="Posição"
            />
          </div>
          <div>
            <Label>Data de início</Label>
            <Input
              {...register("start_date", { required: true })}
              placeholder="Data de início"
              type="date"
            />
          </div>
          <div>
            <Label>Data de fim</Label>
            <Input
              {...register("end_date")}
              placeholder="Data de fim"
              type="date"
            />
          </div>
          <div>
            <Label>Descrição</Label>
            <Input {...register("description")} placeholder="Descrição" />
          </div>
        </div>
        <Button
          type="submit"
          className="bg-secondary text-primary hover:bg-secondary/80 mt-4"
        >
          Adicionar
        </Button>
      </form>
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-black text-secondary p-4 rounded-xl"
            >
              <div className="flex justify-between gap-6">
                <div>
                  <p>{exp.company}</p>
                  <p>{exp.occupation}</p>
                  <div>
                    <p>{exp.start_date}</p>
                    <p>{exp.end_date}</p>
                  </div>
                  {exp.description && <p>{exp.description}</p>}
                </div>
                <div className="self-end">
                  <Trash
                    onClick={() => remove(exp.id)}
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
