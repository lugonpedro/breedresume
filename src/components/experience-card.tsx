import { formatToDate } from "@/utils/format-to-date";
import { Pencil, Trash } from "lucide-react";
import { IconButton } from "./icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ExperienceCardProps {
  exp: ExperienceProps;
  onEdit: (exp: ExperienceProps) => void;
  onRemove: (exp: ExperienceProps) => void;
}

export function ExperienceCard({ exp, onEdit, onRemove }: ExperienceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exp.company}</CardTitle>
        <CardDescription>{exp.occupation}</CardDescription>
        <CardDescription className="flex gap-1">
          <p>{formatToDate(exp.start_date, "date")?.substring(3)}</p>
          <span> - </span>
          <p>
            {exp.end_date
              ? formatToDate(exp.end_date, "date")?.substring(3)
              : "Presente"}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2 text-sm">
          {exp.description && (
            <Popover>
              <PopoverTrigger className="hover:underline duration-300">
                Descrição
              </PopoverTrigger>
              <PopoverContent side="top">{exp.description}</PopoverContent>
            </Popover>
          )}
          {exp.skills.length > 0 && (
            <Popover>
              <PopoverTrigger className="hover:underline duration-300">
                Habilidades
              </PopoverTrigger>
              <PopoverContent side="top">
                {exp.skills.map((skill, index) => (
                  <span key={skill.id}>
                    {skill.title}
                    {index < exp.skills.length - 1 && ", "}
                  </span>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <IconButton onClick={() => onEdit(exp)}>
          <Pencil />
        </IconButton>
        <IconButton onClick={() => onRemove(exp)}>
          <Trash className="text-red-500" />
        </IconButton>
      </CardFooter>
    </Card>
  );
}
