import { ConfirmDialog } from "@/components/confirm-dialog";
import { Modal } from "@/components/modal";
import { SkillCard } from "@/components/skill-card";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContext } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createSkill,
  deleteSkill,
  readSkillsByUser,
  updateSkill,
} from "./actions";

export default function Skills() {
  const [skills, setSkills] = useState<SkillProps[]>([]);

  const [selectedSkill, setSelectedSkill] = useState<SkillProps | undefined>();
  const [editModal, setEditModal] = useState<boolean>(false);
  const [removeDialog, setRemoveDialog] = useState<boolean>(false);

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

  const { register, handleSubmit, reset } = useForm<SkillProps>();

  async function add(data: SkillProps) {
    const res = await createSkill(user!.id, data.title, data.years);

    if (res.error) {
      return;
    }

    reset();
    setSkills((prevArray) => [...prevArray, res.data[0]]);
  }

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { isLoading: isLoadingUpdate, errors: errorsUpdate },
  } = useForm<SkillProps>({
    values: selectedSkill,
  });

  function handleUpdate(skill: SkillProps) {
    setSelectedSkill(skill);
    setEditModal(true);
  }

  async function update(data: SkillProps) {
    const res = await updateSkill(data.id, data.title, data.years);

    if (res.error) {
      return;
    }

    setEditModal(false);
    setSelectedSkill(undefined);
    setSkills((prevArray) =>
      prevArray.map((el) => (el.id === data.id ? res.data![0] : el))
    );
  }

  function handleRemove(skill: SkillProps) {
    setSelectedSkill(skill);
    setRemoveDialog(true);
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
      <Modal
        open={editModal}
        setOpen={() => setEditModal(!editModal)}
        title="Editar Habilidade"
        description={`${selectedSkill?.title}`}
        content={
          <>
            <form
              onSubmit={handleSubmitUpdate(update)}
              className="text-primary"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Título</Label>
                  <Input
                    {...registerUpdate("title", { required: true })}
                    placeholder="Título"
                  />
                  {errorsUpdate.title && <></>}
                </div>
                <div>
                  <Label>Anos</Label>
                  <Input
                    {...registerUpdate("years")}
                    type="number"
                    placeholder="Anos"
                  />
                  {errorsUpdate.years && <></>}
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
        title={`Remover ${selectedSkill?.title}`}
        description="Essa ação não pode ser desfeita"
        proceedText="Remover"
        proceedFn={() => remove(selectedSkill!.id)}
      />

      <Card>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit(add)} className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título</Label>
                <Input
                  {...register("title", { required: true })}
                  placeholder="Título"
                />
              </div>
              <div>
                <Label>Anos</Label>
                <Input
                  {...register("years")}
                  type="number"
                  placeholder="Anos"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4 md:w-max self-end">
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    </>
  );
}
