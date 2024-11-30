import { mockJobVacancies } from "@/mop/jobVacancy";
import { JobCard } from "@/components/JobCards/JobCard";
import { useAI } from "@/hooks/useAI";
import { useEffect, useState } from "react";
import { vacancyExample } from "@/mop/vacancyExample";
import { jobSkills } from "@/mop/jobSkills";
import Subtitle from "@/components/GeneralComponents/Subtitle";
const VacancyPage = () => {
  const { callAI } = useAI();
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const getAIResponse = async () => {
      const { name, shortDescription, description, schedule } = vacancyExample;

      const response = await callAI(
        `Analyze following vacancy data. Name: ${name}. Employer Description: ${shortDescription} ${description}. Work type: ${schedule}. Analyze our skills list: ${jobSkills}. Give me a list of skills that are required for this vacancy.`
      );

      setAiResponse(response);
    };

    getAIResponse();
  }, []);

  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        <Subtitle>Текст підзаголовка</Subtitle> <p>{aiResponse}</p>
      </div>

      {mockJobVacancies.map((job) => (
        <JobCard {...job} />
      ))}
    </div>
  );
};

export default VacancyPage;
