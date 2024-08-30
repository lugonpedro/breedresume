import { formatToDate } from "@/utils/format-to-date";
import { Pencil, Trash } from "lucide-react";
import { IconButton } from "./icon-button";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ExperienceCardProps {
  exp: ExperienceProps;
  onEdit: (exp: ExperienceProps) => void;
  onRemove: (id: number) => void;
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
                <PopoverTrigger>
                  <Button className="bg-secondary text-primary hover:bg-secondary/80">
                    Descrição
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top">{exp.description}</PopoverContent>
              </Popover>
            )}
            {exp.skills.length > 0 && (
              <Popover>
                <PopoverTrigger>
                  <Button className="bg-secondary text-primary hover:bg-secondary/80">
                    Habilidades
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top">
                  {exp.skills.map((skill, index) => (
                    <span>
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
          <IconButton>
            <Pencil onClick={() => onEdit(exp)} className="text-black" />
          </IconButton>
          <IconButton>
            <Trash onClick={() => onRemove(exp.id)} className="text-red-500" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
