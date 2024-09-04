import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { readExperiencesByUser } from "../experiences/actions";
import { authContext } from "@/contexts/auth-context";
import { readSkillsByUser } from "../skills/actions";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/text-area";
import { Switch } from "@/components/ui/switch";

interface ExperienceWithChecked extends ExperienceProps, CheckedProps {
  [key: string]: any;
}

interface SkillWithChecked extends SkillProps, CheckedProps {
  [key: string]: any;
}

interface MyResumeProps {
  experiences: ExperienceWithChecked[];
  skills: SkillWithChecked[];
}

const MyResume = ({ experiences, skills }: MyResumeProps) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 20, textAlign: "justify", gap: 12 }}>
        {experiences.length > 0 && (
          <View>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              Experiências
            </Text>
            <View style={{ gap: 8 }}>
              {experiences
                .filter((exp) => exp.checked)
                .map((exp) => (
                  <View key={exp.id}>
                    <Text>{exp.company}</Text>
                    <Text>{exp.occupation}</Text>
                    <Text>{exp.start_date}</Text>
                    <Text>{exp.end_date}</Text>
                    <Text>{exp.description}</Text>
                    {exp.skills.length > 0 &&
                      exp.skills.map((skill) => (
                        <Text key={skill.id}>{skill.title}</Text>
                      ))}
                  </View>
                ))}
            </View>
          </View>
        )}
        {skills.length > 0 && (
          <View>
            <Text style={{ fontWeight: "semibold", marginBottom: 4 }}>
              Habilidades
            </Text>
            <View style={{ gap: 12 }}>
              {skills
                .filter((skill) => skill.checked)
                .map((skill) => (
                  <View key={skill.id} style={{ flexDirection: "row", gap: 4 }}>
                    <Text>{skill.title}</Text>
                    {skill.years && (
                      <>
                        <Text>-</Text>
                        <Text>
                          {skill.years}{" "}
                          {parseInt(skill.years) > 1 ? "anos" : "ano"}
                        </Text>
                      </>
                    )}
                  </View>
                ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default function GeneratePdf() {
  const [experiences, setExperiences] = useState<ExperienceWithChecked[]>([]);
  const [skills, setSkills] = useState<SkillWithChecked[]>([]);

  const user = authContext((state) => state.user);

  useEffect(() => {
    async function readExperiences() {
      const res = await readExperiencesByUser(user!.id);

      if (res.error) {
        return;
      }

      const formatted = res.data.map((exp) => {
        return { ...exp, checked: true };
      });

      setExperiences(formatted);
    }

    async function readSkills() {
      const res = await readSkillsByUser(user!.id);

      if (res.error) {
        return;
      }

      const formatted = res.data.map((skill) => {
        return { ...skill, checked: true };
      });

      setSkills(formatted);
    }

    if (user) {
      readExperiences();
      readSkills();
    }
  }, [user]);

  function handleExperience(
    index: number,
    key: string,
    value: string | boolean
  ) {
    setExperiences((prevArray) => {
      const newArray: ExperienceWithChecked[] = [...prevArray];
      newArray[index][key] = value;
      console.log(newArray);
      return newArray;
    });
  }

  function handleSkill(index: number, key: string, value: string) {
    setSkills((prevArray) => {
      const newArray: SkillWithChecked[] = [...prevArray];
      newArray[index][key] = value;
      return newArray;
    });
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 text-secondary">
        <div className="w-full flex flex-col gap-4">
          <div>
            <Label className="text-xl">Experiências</Label>
            <div className="flex flex-col gap-2 mt-4">
              {experiences.map((exp, index) => (
                <div className="flex flex-col gap-2" key={exp.id}>
                  <Switch
                    checked={exp.checked}
                    onCheckedChange={() =>
                      handleExperience(index, "checked", !exp.checked)
                    }
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={exp.company ?? ""}
                      onChange={(e) =>
                        handleExperience(index, "company", e.target.value)
                      }
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
                      className="col-span-2"
                      onChange={(e) =>
                        handleExperience(index, "description", e.target.value)
                      }
                    />
                  </div>
                  {/* <SelectMultiInput
                    placeholder="Habilidades"
                    value={exp.skills.map((skill) => {
                      return skill.id.toString();
                    })}
                    options={exp.skills.map((skill) => {
                      return {
                        value: skill.id.toString(),
                        label: skill.title,
                      };
                    })}
                    onChange={(e) => handleExperience(index, "test", e)}
                  /> */}
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <Label className="text-secondary text-xl">Habilidades</Label>
            <div className="flex flex-col gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="text-secondary grid grid-cols-2 gap-2"
                >
                  <Input
                    value={skill.title ?? ""}
                    onChange={(e) =>
                      handleSkill(index, "title", e.target.value)
                    }
                  />
                  <Input
                    value={skill.years ?? ""}
                    type="number"
                    onChange={(e) =>
                      handleSkill(index, "years", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <Separator />
        </div>
        <PDFViewer className="w-full" showToolbar={false}>
          <MyResume experiences={experiences} skills={skills} />
        </PDFViewer>
      </div>
      <PDFDownloadLink
        document={<MyResume experiences={experiences} skills={skills} />}
        className="max-w-screen-md"
      >
        <Button className="mt-10 uppercase font-semibold bg-secondary text-primary hover:bg-secondary/80">
          Download
        </Button>
      </PDFDownloadLink>
    </>
  );
}
