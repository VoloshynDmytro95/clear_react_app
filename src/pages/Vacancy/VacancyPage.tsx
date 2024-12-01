import VacancyHeader from "./components/Header/Header";
import VacancyCard from "./components/VacancyCard/VacancyCard";
import { useState, useEffect } from "react";
import FilterModal from "./components/FilterModal/FilterModal";

const VacancyPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const closeOnClickOutside = () => setIsFilterOpen(false);

    if (isFilterOpen) {
      window.addEventListener('mousedown', closeOnClickOutside);
    }

    return () => window.removeEventListener('mousedown', closeOnClickOutside);
  }, [isFilterOpen]);

  return (
    <div>
      <VacancyHeader />
      {/* {mockJobVacancies.map((job) => (
        <JobCard key={job.id} {...job} />
      ))} */}
      <div className="bg-[#E1DECB] h-screen flex flex-col items-center py-8 px-4">
        <div className="flex flex-col items-start  w-full mb-6">
          <h2 className="text-[24px] font-[600] leading-8">Всього вакансій: 15</h2>
          <button 
            onClick={() => setIsFilterOpen(true)}
          >
            Фільтр
          </button>
        </div>

        <VacancyCard />
      </div>

      {isFilterOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <FilterModal onClose={() => setIsFilterOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default VacancyPage;
