import { Pencil, Trash } from "lucide-react";
import { IconButton } from "./icon-button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface SkillCardProps {
  skill: SkillProps;
  onEdit: (skill: SkillProps) => void;
  onRemove: (skill: SkillProps) => void;
}

export function SkillCard({ skill, onEdit, onRemove }: SkillCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{skill.title}</CardTitle>
        {skill.years && (
          <CardDescription>
            {skill.years} {parseInt(skill.years) > 1 ? "anos" : "ano"}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="flex gap-2">
        <IconButton onClick={() => onEdit(skill)}>
          <Pencil />
        </IconButton>
        <IconButton onClick={() => onRemove(skill)}>
          <Trash className="text-red-500" />
        </IconButton>
      </CardFooter>
    </Card>
  );
}
