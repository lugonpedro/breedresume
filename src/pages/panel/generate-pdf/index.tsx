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
  Font,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { readExperiencesByUser } from "../experiences/actions";
import { authContext } from "@/contexts/auth-context";
import { readSkillsByUser } from "../skills/actions";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/text-area";
import { Switch } from "@/components/ui/switch";
import { formatToDate } from "@/utils/format-to-date";
import { Card, CardContent } from "@/components/ui/card";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

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
      <Page
        size="A4"
        style={{
          padding: 20,
          textAlign: "justify",
          gap: 12,
          fontFamily: "Open Sans",
        }}
      >
        {experiences.length > 0 && (
          <View>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              Experiências
            </Text>
            <View style={{ gap: 8, fontSize: 14 }}>
              {experiences
                .filter((exp) => exp.checked)
                .map((exp) => (
                  <View key={exp.id}>
                    <Text>{exp.company}</Text>
                    <Text>{exp.occupation}</Text>
                    <View style={{ flexDirection: "row", gap: 2 }}>
                      <Text>
                        {formatToDate(exp.start_date, "date")?.substring(3)}
                      </Text>
                      <Text>-</Text>
                      <Text>
                        {exp.end_date
                          ? formatToDate(exp.end_date, "date")?.substring(3)
                          : "Presente"}
                      </Text>
                    </View>
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
            <Text style={{ fontWeight: 600, marginBottom: 4 }}>
              Habilidades
            </Text>
            <View style={{ gap: 8, fontSize: 14 }}>
              {skills
                .filter((skill) => skill.checked)
                .map((skill) => (
                  <View key={skill.id} style={{ flexDirection: "row" }}>
                    <Text style={{ marginHorizontal: 8 }}>•</Text>
                    <Text>{skill.title}</Text>
                    {/* {skill.years && (
                      <Text>
                        {skill.years}{" "}
                        {parseInt(skill.years) > 1 ? "anos" : "ano"}
                      </Text>
                    )} */}
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
                <Card className="flex flex-col gap-2 bg-secondary" key={exp.id}>
                  <CardContent className="py-2">
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
                  </CardContent>
                </Card>
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
        <div className="flex flex-col-reverse md:flex-col w-full gap-4">
          <PDFDownloadLink
            document={<MyResume experiences={experiences} skills={skills} />}
            className=""
          >
            <Button className="uppercase font-semibold bg-secondary text-primary hover:bg-secondary/80">
              Download
            </Button>
          </PDFDownloadLink>
          <PDFViewer className="h-screen" showToolbar={false}>
            <MyResume experiences={experiences} skills={skills} />
          </PDFViewer>
        </div>
      </div>
    </>
  );
}
