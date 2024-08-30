import { formatToDate } from "@/utils/format-to-date";
import { Pencil, Trash } from "lucide-react";
import { IconButton } from "./icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ExperienceCardProps {
  exp: ExperienceProps;
  onEdit: (exp: ExperienceProps) => void;
  onRemove: (exp: ExperienceProps) => void;
}

export function ExperienceCard({ exp, onEdit, onRemove }: ExperienceCardProps) {
  return (
    <div key={exp.id} className="bg-black text-secondary p-4 rounded-xl">
      <div className="flex flex-col-reverse justify-normal md:flex-row md:justify-between gap-4">
        <div>
          <p className="font-semibold">{exp.company}</p>
          <p>{exp.occupation}</p>
          <div className="flex gap-1">
            <p>{formatToDate(exp.start_date, "date")?.substring(3)}</p>
            <span> - </span>
            <p>
              {exp.end_date
                ? formatToDate(exp.end_date, "date")?.substring(3)
                : "Presente"}
            </p>
          </div>
          <div className="flex flex-row gap-2 mt-4">
            {exp.description && (
              <Popover>
                <PopoverTrigger className="text-secondary hover:underline duration-300">
                  Descrição
                </PopoverTrigger>
                <PopoverContent side="top">{exp.description}</PopoverContent>
              </Popover>
            )}
            {exp.skills.length > 0 && (
              <Popover>
                <PopoverTrigger className="text-secondary hover:underline duration-300">
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
        </div>
        <div className="flex gap-2">
          <IconButton onClick={() => onEdit(exp)}>
            <Pencil className="text-black" />
          </IconButton>
          <IconButton onClick={() => onRemove(exp)}>
            <Trash className="text-red-500" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
