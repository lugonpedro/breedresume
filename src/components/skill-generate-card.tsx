import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

interface SkillGenerateCardProps {
  skill: SkillWithChecked;
  index: number;
  handleSkill: (index: number, key: string, value: any) => void;
}

export function SkillGenerateCard({
  skill,
  index,
  handleSkill,
}: SkillGenerateCardProps) {
  return (
    <Card className="flex flex-col gap-2 bg-secondary">
      <CardContent className="py-2">
        <Switch
          checked={skill.checked}
          onCheckedChange={() => handleSkill(index, "checked", !skill.checked)}
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={skill.title ?? ""}
            onChange={(e) => handleSkill(index, "title", e.target.value)}
          />
          <Input
            value={skill.years ?? ""}
            type="number"
            onChange={(e) => handleSkill(index, "years", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
