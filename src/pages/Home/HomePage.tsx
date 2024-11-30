import { JobCard } from "@/components/JobCard";
import { mockJobVacancies } from "@/mop/jobVacancy";
import { useAI } from "@/hooks/useAI";
import { useEffect } from "react";

const HomePage = () => {
  const { callAI, isLoading, error } = useAI();

  useEffect(() => {
    const getAIResponse = async () => {
      const response = await callAI("Tell me about job searching");
      console.log(response);
    };

    getAIResponse();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      HomePage
      {mockJobVacancies.map((job) => (
        <JobCard {...job} />
      ))}
    </div>
  );
};

export default HomePage;
