import { useLayoutEffect, useState } from "react";
import { SelectMultiInput } from "./select-multi-input";
import { TextArea } from "./text-area";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

interface ExperienceGenerateCardProps {
  exp: ExperienceWithChecked;
  index: number;
  handleExperience: (index: number, key: string, value: any) => void;
  skills: SkillProps[];
}

export function ExperienceGenerateCard({
  exp,
  index,
  handleExperience,
  skills,
}: ExperienceGenerateCardProps) {
  const [skillsInExperience, setSkillsInExperience] = useState<string[]>(
    exp.skills.map((skill) => {
      return skill.id.toString();
    })
  );

  useLayoutEffect(() => {
    if (skillsInExperience.length === 0) {
      return;
    }

    const formattedSkills = skillsInExperience.map((skill) => {
      return {
        id: parseInt(skill),
        title: skills.find((sk) => sk.id === parseInt(skill))!.title,
      };
    });

    handleExperience(index, "skills", formattedSkills);
  }, [skillsInExperience]);

  return (
    <Card className="flex flex-col gap-2 bg-secondary">
      <CardContent className="py-2">
        <Switch
          checked={exp.checked}
          onCheckedChange={() =>
            handleExperience(index, "checked", !exp.checked)
          }
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
        />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input
            value={exp.company ?? ""}
            onChange={(e) => handleExperience(index, "company", e.target.value)}
          />
          <Input
            value={exp.occupation ?? ""}
            onChange={(e) =>
              handleExperience(index, "occupation", e.target.value)
            }
          />
          <Input
            value={exp.start_date ?? ""}
            type="date"
            onChange={(e) =>
              handleExperience(index, "start_date", e.target.value)
            }
          />
          <Input
            value={exp.end_date ?? ""}
            type="date"
            onChange={(e) =>
              handleExperience(index, "end_date", e.target.value)
            }
          />
          <TextArea
            value={exp.description ?? ""}
            onChange={(e) =>
              handleExperience(index, "description", e.target.value)
            }
            className="col-span-2"
          />
        </div>
        <SelectMultiInput
          placeholder="Habilidades"
          value={skillsInExperience}
          onChange={setSkillsInExperience}
          options={skills.map((skill) => {
            return {
              value: skill.id.toString(),
              label: skill.title,
            };
          })}
        />
      </CardContent>
    </Card>
  );
}
