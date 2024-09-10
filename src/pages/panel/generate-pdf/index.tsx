import { ExperienceGenerateCard } from "@/components/experience-generate-card";
import { SkillGenerateCard } from "@/components/skill-generate-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authContext } from "@/contexts/auth-context";
import { formatToDate } from "@/utils/format-to-date";
import {
  Document,
  Font,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { readExperiencesByUser } from "../experiences/actions";
import { readSkillsByUser } from "../skills/actions";

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
          fontSize: 12,
        }}
      >
        {experiences.length > 0 && (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
              Experiências
            </Text>
            <View style={{ gap: 8 }}>
              {experiences
                .filter((exp) => exp.checked)
                .map((exp) => (
                  <View key={exp.id}>
                    <Text style={{ fontSize: 14, fontWeight: "semibold" }}>
                      {exp.company}
                    </Text>
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
                    {exp.skills.length > 0 && (
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        {exp.skills.map((skill) => (
                          <Text key={skill.id}>{skill.title}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
            </View>
          </View>
        )}
        {skills.length > 0 && (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
              Habilidades
            </Text>
            <View style={{ gap: 4 }}>
              {skills
                .filter((skill) => skill.checked)
                .map((skill) => (
                  <View key={skill.id} style={{ flexDirection: "row" }}>
                    <Text style={{ marginRight: 4 }}>•</Text>
                    <Text style={{ marginRight: 4 }}>{skill.title}</Text>
                    {skill.years && (
                      <Text>
                        {skill.years}{" "}
                        {parseInt(skill.years) > 1 ? "anos" : "ano"}
                      </Text>
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

  function handleExperience(index: number, key: string, value: any) {
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
                <ExperienceGenerateCard
                  key={exp.id}
                  exp={exp}
                  index={index}
                  handleExperience={handleExperience}
                  skills={skills}
                />
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <Label className="text-xl">Habilidades</Label>
            <div className="flex flex-col gap-2 mt-4">
              {skills.map((skill, index) => (
                <SkillGenerateCard
                  key={skill.id}
                  skill={skill}
                  index={index}
                  handleSkill={handleSkill}
                />
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
