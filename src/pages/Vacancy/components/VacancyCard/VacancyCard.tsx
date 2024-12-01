import { Vacancy } from "@/api/types";
import { Link } from "react-router-dom";

const VacancyCard = ({
  isApplied,
  ...vacancy
}: { isApplied: boolean } & Vacancy) => {
  console.log(isApplied);
  const renderSalary = () => {
    if (vacancy.salary) {
      return `${vacancy.salary} грн.`;
    }

    if (vacancy.salaryFrom && vacancy.salaryTo) {
      return `${vacancy.salaryFrom} - ${vacancy.salaryTo} грн.`;
    }

    return "Зарплата не вказана";
  };

  const renderLogo = () => {
    if (vacancy.logo) {
      return (
        <img src={vacancy.logo} className="w-full h-auto relative" alt="" />
      );
    }
    return <div className="w-4 h-4 relative" />;
  };
  return (
    <Link to={`/vacancy/${vacancy.id}`}>
      <div className="cursor-pointer hover:shadow-lg transition-shadow">
        <div className="flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch p-5 bg-white rounded-[20px] shadow border border-neutral-300 flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch text-[#18191c] text-lg font-bold font-['Inter'] leading-[18px]">
                {vacancy.title}
              </div>
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="px-2 py-1 bg-[#c0fecc] rounded-[3px] justify-start items-start gap-2.5 flex">
                  <div className="text-[#0ba02c] text-xs font-semibold font-['Inter'] uppercase leading-3">
                    {vacancy.schedule}
                  </div>
                </div>
                <div className="text-[#767f8c] text-sm font-medium font-['Inter'] leading-tight">
                  {renderSalary()}
                </div>
              </div>
            </div>
            <div className="self-stretch justify-center items-end gap-2 inline-flex">
              <div className="grow shrink basis-0 h-[38px] justify-start items-center gap-2 flex">
                <div className="bg-[#edeff4] rounded-[26.67px] justify-start items-start gap-[6.67px] flex w-8 h-8">
                  {renderLogo()}
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-[#3c3c3c] text-sm font-bold font-['Inter'] leading-[14px]">
                    {vacancy.companyName}
                  </div>
                  <div className="w-[233px] h-5 text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                    {vacancy.cityName}
                  </div>
                </div>
              </div>
              <div className="w-6 h-6 relative">
                <div className="w-6 h-6 left-0 top-0 absolute"></div>
              </div>
            </div>
            {isApplied && (
          <div className="bg-green-200 p-2 rounded-md text-gray-600 text-[8px]">
            Ви вже відгукнулись на цю вакансію
          </div>
        )}
          </div>

        </div>

      </div>
    </Link>
  );
};

export default VacancyCard;
