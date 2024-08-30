import { ExperienceCard } from "@/components/experience-card";
import { Modal } from "@/components/modal";
import { SelectMultiInput } from "@/components/select-multi-input";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContext } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { readSkillsByUser } from "../skills/actions";
import {
  createExperience,
  deleteExperience,
  readExperiencesByUser,
} from "./actions";

export default function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);

  const [skills, setSkills] = useState<SelectObjectProps[]>([]);

  const [skillsInExperience, setSkillsInExperience] = useState<string[]>([]);

  const user = authContext((state) => state.user);

  useEffect(() => {
    async function readAll() {
      const res = await readExperiencesByUser(user!.id);

      if (res.error) {
        return;
      }

      console.log(res.data);
      setExperiences(res.data!);
    }

    async function readAllSkills() {
      const res = await readSkillsByUser(user!.id);

      if (res.error) {
        return;
      }

      let formattedSkills = res.data.map((skill) => {
        return { value: `${skill.id}`, label: skill.title };
      });

      setSkills(formattedSkills);
    }

    if (user) {
      readAll();
      readAllSkills();
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, errors },
  } = useForm<ExperienceProps>();

  async function add(data: ExperienceProps) {
    const res = await createExperience(
      user!.id,
      data.company,
      data.occupation,
      data.start_date,
      data.end_date,
      data.description,
      skillsInExperience
    );

    console.log(res);
    if (res.error) {
      return;
    }

    reset();
    setSkillsInExperience([]);
    setExperiences((prevArray) => [...prevArray, res.data![0]]);
  }

  async function update(experience: ExperienceProps) {
    console.log(experience);
    // setMyArray(prevArray => prevArray.map(elemento => elemento === elementoParaAtualizar ? novoValor : elemento));
  }

  async function remove(id: number) {
    console.log(id);

    return;

    const res = await deleteExperience(id);

    if (res.error) {
      return;
    }

    setExperiences((prevArray) => prevArray.filter((el) => el.id !== id));
  }

  return (
    <>
      <Modal
        open={false}
        setOpen={function (bool: boolean): void {
          throw new Error("Function not implemented.");
        }}
        title={""}
        content={undefined}
      />
      <form onSubmit={handleSubmit(add)} className="text-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Empresa</Label>
            <Input
              {...register("company", { required: true })}
              placeholder="Empresa"
            />
            {errors.company && <></>}
          </div>
          <div>
            <Label>Posição</Label>
            <Input
              {...register("occupation", { required: true })}
              placeholder="Posição"
            />
            {errors.occupation && <></>}
          </div>
          <div>
            <Label>Data de início</Label>
            <Input
              {...register("start_date", { required: true })}
              placeholder="Data de início"
              type="date"
            />
            {errors.company && <></>}
          </div>
          <div>
            <Label>Data de fim</Label>
            <Input
              {...register("end_date")}
              placeholder="Data de fim"
              type="date"
            />
            {errors.company && <></>}
          </div>
          <div>
            <Label>Habilidades</Label>
            <SelectMultiInput
              options={skills}
              value={skillsInExperience}
              onChange={setSkillsInExperience}
              placeholder="Habilidades"
            />
            {errors.company && <></>}
          </div>
          <div>
            <Label>Descrição</Label>
            <Input {...register("description")} placeholder="Descrição" />
            {errors.company && <></>}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-secondary text-primary hover:bg-secondary/80 mt-4"
          disabled={isLoading}
        >
          {isLoading ? <Spinner className="fill-primary" /> : "Adicionar"}
        </Button>
      </form>
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {experiences.map((exp) => (
            <ExperienceCard exp={exp} onEdit={update} onRemove={remove} />
          ))}
        </div>
      </div>
    </>
  );
}
