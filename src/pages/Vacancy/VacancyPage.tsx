import React from "react";
import { mockJobVacancies } from "@/mop/jobVacancy";
import { JobCard } from "@/components/JobCard";
import { useAI } from "@/hooks/useAI";
import { useEffect, useState } from "react";
import { vacancyExample } from "@/mop/vacancyExample";
import { jobSkills } from "@/mop/jobSkills";

const VacancyPage = () => {
  const { callAI } = useAI();
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const getAIResponse = async () => {
      const response = await callAI(
        `Analyze this vacancy data: ${vacancyExample}. Analyze our skills list: ${jobSkills}. Give me a list of skills that are required for this vacancy.`
      );
      setAiResponse(response);
    };

    getAIResponse();
  }, []);

  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">AI Job Search Tips</h2>
        <p>{aiResponse}</p>
      </div>

      {mockJobVacancies.map((job) => (
        <JobCard {...job} />
      ))}
    </div>
  );
};

export default VacancyPage;
