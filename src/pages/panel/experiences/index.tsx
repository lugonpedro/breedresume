import { ConfirmDialog } from "@/components/confirm-dialog";
import { ExperienceCard } from "@/components/experience-card";
import { Modal } from "@/components/modal";
import { SelectMultiInput } from "@/components/select-multi-input";
import { Spinner } from "@/components/spinner";
import { TextArea } from "@/components/text-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  updateExperience,
} from "./actions";

export default function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
  const [skills, setSkills] = useState<SelectObjectProps[]>([]);

  const [skillsInExperience, setSkillsInExperience] = useState<string[]>([]);
  const [previousEditSkillsInExperience, setPreviousEditSkillsInExperience] =
    useState<string[]>([]);
  const [editSkillsInExperience, setEditSkillsInExperience] = useState<
    string[]
  >([]);

  const [selectedExp, setSelectedExp] = useState<ExperienceProps | undefined>();
  const [editModal, setEditModal] = useState<boolean>(false);
  const [removeDialog, setRemoveDialog] = useState<boolean>(false);

  const user = authContext((state) => state.user);

  useEffect(() => {
    async function readAll() {
      const res = await readExperiencesByUser(user!.id);

      if (res.error) {
        return;
      }

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

    if (res.error) {
      return;
    }

    reset();
    setSkillsInExperience([]);
    setExperiences((prevArray) => [...prevArray, res.data![0]]);
  }

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { isLoading: isLoadingUpdate, errors: errorsUpdate },
  } = useForm<ExperienceProps>({
    values: selectedExp,
  });

  function handleUpdate(exp: ExperienceProps) {
    setSelectedExp(exp);
    let formattedSkills = exp.skills.map((skill) => {
      return skill.id.toString();
    });
    setPreviousEditSkillsInExperience(formattedSkills);
    setEditSkillsInExperience(formattedSkills);
    setEditModal(true);
  }

  async function update(data: ExperienceProps) {
    const res = await updateExperience(
      data.id,
      data.company,
      data.occupation,
      data.start_date,
      data.end_date,
      data.description,
      previousEditSkillsInExperience,
      editSkillsInExperience
    );

    if (res.error) {
      return;
    }

    setPreviousEditSkillsInExperience([]);
    setEditSkillsInExperience([]);
    setEditModal(false);
    setSelectedExp(undefined);
    setExperiences((prevArray) =>
      prevArray.map((el) => (el.id === data.id ? res.data![0] : el))
    );
  }

  function handleRemove(exp: ExperienceProps) {
    setSelectedExp(exp);
    setRemoveDialog(true);
  }

  async function remove(id: number) {
    const res = await deleteExperience(id);

    if (res.error) {
      return;
    }

    setSelectedExp(undefined);
    setExperiences((prevArray) => prevArray.filter((el) => el.id !== id));
  }

  return (
    <>
      <Modal
        open={editModal}
        setOpen={() => setEditModal(!editModal)}
        title="Editar Experiência"
        description={`${selectedExp?.company} - ${selectedExp?.occupation}`}
        content={
          <>
            <form
              onSubmit={handleSubmitUpdate(update)}
              className="text-primary"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Empresa</Label>
                  <Input
                    {...registerUpdate("company", { required: true })}
                    placeholder="Empresa"
                  />
                  {errorsUpdate.company && <></>}
                </div>
                <div>
                  <Label>Posição</Label>
                  <Input
                    {...registerUpdate("occupation", { required: true })}
                    placeholder="Posição"
                  />
                  {errorsUpdate.occupation && <></>}
                </div>
                <div>
                  <Label>Data de início</Label>
                  <Input
                    {...registerUpdate("start_date", { required: true })}
                    placeholder="Data de início"
                    type="date"
                  />
                  {errorsUpdate.company && <></>}
                </div>
                <div>
                  <Label>Data de fim</Label>
                  <Input
                    {...registerUpdate("end_date")}
                    placeholder="Data de fim"
                    type="date"
                  />
                  {errorsUpdate.company && <></>}
                </div>
                <div className="md:col-span-2">
                  <Label>Habilidades</Label>
                  <SelectMultiInput
                    options={skills}
                    value={editSkillsInExperience}
                    onChange={setEditSkillsInExperience}
                    placeholder="Habilidades"
                  />
                  {errorsUpdate.company && <></>}
                </div>
                <div className="md:col-span-2">
                  <Label>Descrição</Label>
                  <TextArea
                    {...registerUpdate("description")}
                    placeholder="Descrição"
                  />
                  {errorsUpdate.company && <></>}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-full mt-4 md:w-max"
                  disabled={isLoadingUpdate}
                >
                  {isLoadingUpdate ? (
                    <Spinner className="fill-primary" />
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </div>
            </form>
          </>
        }
      />
      <ConfirmDialog
        open={removeDialog}
        onOpenChange={() => setRemoveDialog(!removeDialog)}
        title={`Remover ${selectedExp?.company} - ${selectedExp?.occupation}`}
        description="Essa ação não pode ser desfeita"
        proceedText="Remover"
        proceedFn={() => remove(selectedExp!.id)}
      />

      <Card>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit(add)} className="flex flex-col">
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
              <div className="md:col-span-2">
                <Label>Habilidades</Label>
                <SelectMultiInput
                  options={skills}
                  value={skillsInExperience}
                  onChange={setSkillsInExperience}
                  placeholder="Habilidades"
                />
                {errors.company && <></>}
              </div>
              <div className="md:col-span-2">
                <Label>Descrição</Label>
                <TextArea
                  {...register("description")}
                  placeholder="Descrição"
                />
                {errors.company && <></>}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-4 md:w-max self-end"
              disabled={isLoading}
            >
              {isLoading ? <Spinner className="fill-primary" /> : "Adicionar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              onEdit={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    </>
  );
}
