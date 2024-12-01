import VacancyHeader from "./components/Header/Header";
import VacancyCard from "./components/VacancyCard/VacancyCard";
import { useEffect, useState } from "react";
import FilterModal from "./components/FilterModal/FilterModal";
import { useSearchVacancy } from "@/api/vacancy/useSearchVacancy";
import { SearchVacancyPayload, Vacancy, VacancySchedule } from "@/api/types";

const VacancyPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  const onApplyFilters = (payload: Omit<SearchVacancyPayload, "skills">) => {
    setIsFilterOpen(false);
    useSearchVacancy({
      salaryFrom: payload.salaryFrom,
      salaryTo: payload.salaryTo,
      schedule: payload.schedule,
      skills: [],
    }).then((res) => setVacancies(res.vacancies));
  };

  useEffect(() => {
    const closeOnClickOutside = () => setIsFilterOpen(false);

    if (isFilterOpen) {
      window.addEventListener("mousedown", closeOnClickOutside);
    }

    return () => window.removeEventListener("mousedown", closeOnClickOutside);
  }, [isFilterOpen]);

  useEffect(() => {
    useSearchVacancy({
      salaryFrom: 20000,
      salaryTo: 40000,
      schedule: VacancySchedule.FULL_TIME,
      skills: [],
    }).then((res) => setVacancies(res.vacancies));
  }, []);

  const renderVacancies = () => {
    return vacancies.map((vacancy) => (
      <VacancyCard key={vacancy.id} {...vacancy} />
    ));
  };

  return (
    <div>
      <VacancyHeader />
      {/* {mockJobVacancies.map((job) => (
        <JobCard key={job.id} {...job} />
      ))} */}
      <div className="bg-[#E1DECB] h-screen flex flex-col items-center py-8 px-4">
        <div className="flex flex-col items-start  w-full mb-6">
          <h2 className="text-[24px] font-[600] leading-8">
            Всього вакансій: {vacancies.length}
          </h2>
          <button onClick={() => setIsFilterOpen(true)}>Фільтр</button>
        </div>

        <div className="grid gap-4 max-h-screen overflow-scroll">
          {renderVacancies()}
        </div>
      </div>

      {isFilterOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <FilterModal onSubmit={onApplyFilters} />
        </div>
      )}
    </div>
  );
};

export default VacancyPage;
