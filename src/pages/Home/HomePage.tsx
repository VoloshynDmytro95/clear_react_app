import { JobCard } from "@/components/JobCard";
import { mockJobVacancies } from "@/mop/jobVacancy";
const HomePage = () => {
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
