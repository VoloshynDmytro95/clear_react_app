import { JobCard } from "@/components/JobCard";
import { mockJobVacancies } from "@/mop/jobVacancy";
const HomePage = () => {
  return (
    <div>
      HomePage
      {mockJobVacancies.map((job) => (
        <JobCard {...job} />
      ))}
    </div>
  );
};

export default HomePage;
