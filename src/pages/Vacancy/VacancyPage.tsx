import VacancyHeader from "./components/Header/Header";
import VacancyCard from "./components/VacancyCard/VacancyCard";
import { useEffect, useState } from "react";
import FilterModal, {
  SearchFilters,
} from "./components/FilterModal/FilterModal";
import { useSearchVacancy } from "@/api/vacancy/useSearchVacancy";
import { SearchVacancyPayload, Vacancy, VacancySchedule } from "@/api/types";
import SecondaryButton from "@/components/FormComponents/Button/SecondaryButton";

const VacancyPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<SearchVacancyPayload>({
    salaryFrom: 20000,
    salaryTo: 40000,
    schedule: VacancySchedule.FULL_TIME,
    skills: [],
    page: 1,
  });

  const onApplyFilters = (payload: SearchFilters) => {
    setIsFilterOpen(false);
    useSearchVacancy(filters).then((res) => setVacancies(res.vacancies));
    setPage(1);
  };

  const onShowMore = () => {
    useSearchVacancy({
      ...filters,
      page: page + 1,
    }).then((res) => setVacancies([...vacancies, ...res.vacancies]));
    setPage(page + 1);
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
      ...filters,
      page: page,
    }).then((res) => setVacancies(res.vacancies));
  }, []);

  const getAppliedVacancies = () => {
    return JSON.parse(localStorage.getItem('appliedVacancies') || '[]');
  };

  const renderVacancies = () => {
    const appliedVacancies = getAppliedVacancies();
    
    return vacancies.map((vacancy) => (
      <div key={vacancy.id}>
        <VacancyCard 
          {...vacancy} 
          isApplied={appliedVacancies.includes(vacancy.id)}
        />
      </div>
    ));
  };

  return (
    <div>
      <VacancyHeader />
      <div className="bg-[#E1DECB] h-screen flex flex-col items-center py-8 px-4">
        <div className="flex flex-col items-start  w-full mb-6">
          <h2 className="text-[24px] font-[600] leading-8">Вакансії для вас</h2>
          <button onClick={() => setIsFilterOpen(true)}>Фільтр</button>
        </div>

        <div className="grid gap-4 mb-4">{renderVacancies()}</div>

        <SecondaryButton onClick={onShowMore}>Показати ще</SecondaryButton>
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
