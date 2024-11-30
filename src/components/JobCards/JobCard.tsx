import { JobVacancy } from "@/mop/jobVacancy";
import Title from "@/components/GeneralComponents/Title";

interface JobCardProps extends JobVacancy {}

export const JobCard = ({
  title,
  salary,
  companyName,
  location,
  description,
}: JobCardProps) => {
  return (
    <div className="bg-red shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <Title className="text-2xl font-bold mb-2">{title}</Title>
        <p className="text-gray-500 mb-4">{companyName}</p>
        <p className="text-gray-500 mb-4">{location}</p>
        <p className="text-gray-700 mb-6">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-500 font-bold">{salary}</span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
