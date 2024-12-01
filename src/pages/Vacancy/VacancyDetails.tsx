import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/pages/Vacancy/components/Header/Header";
import { LoadingModal } from "@/animations/loading";
import api from "@/api/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VacancyDetails = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Тут додайте API запит для отримання деталей вакансії
    const fetchVacancy = async () => {
      try {
        const response = await api.vacancy.getById(id || "");
        setVacancy(response);
      } catch (error) {
        console.error("Помилка при завантаженні вакансії:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  const checkIfAlreadyApplied = () => {
    const appliedVacancies = JSON.parse(localStorage.getItem('appliedVacancies') || '[]');
    return appliedVacancies.includes(id);
  };

  const handleApply = () => {
    if (checkIfAlreadyApplied()) {
      toast.info('Ви вже відправляли відгук на цю вакансію', {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const appliedVacancies = JSON.parse(localStorage.getItem('appliedVacancies') || '[]');
    appliedVacancies.push(id);
    localStorage.setItem('appliedVacancies', JSON.stringify(appliedVacancies));

    toast.success('Ви успішно відгукнулись на вакансію', {
      position: "top-center",
      autoClose: 2000,
      onClose: () => navigate('/vacancy')
    });
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingModal isOpen={true} onClose={() => {}} />
      </div>
    );
  if (!vacancy) return <div>Вакансію не знайдено </div>;

  return (
    <div className="bg-[#dfdaba] min-h-screen">
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="self-stretch text-[#18191c] text-[28px] font-semibold font-['Inter'] leading-loose">
          {vacancy.title}
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="px-[3px] justify-center items-center flex">
              <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                💰
              </div>
            </div>
            <div className="grow shrink basis-0 text-[#18191c] text-sm font-bold font-['Inter'] leading-tight">
              {`${vacancy.salaryFrom} - ${vacancy.salaryTo} грн.` ||
                "Не вказано"}
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="px-[3px] justify-center items-center flex">
              <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                🏢
              </div>
            </div>
            <div className="text-[#18191c] text-base font-semibold font-['Inter'] leading-tight">
              Компанія
            </div>
            <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-tight">
              {vacancy.companyName || "Не вказано"}
            </div>
            <div className="w-4 h-4 justify-center items-center flex">
              <div className="w-4 h-4 relative"></div>
            </div>
          </div>
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="px-[3px] justify-center items-center flex">
              <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                📍
              </div>
            </div>
            <div className="grow shrink basis-0 text-[#18191c] text-base font-normal font-['Inter'] leading-tight">
              місто {vacancy.cityName || "Не вказано"}
            </div>
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-[#18191c] text-xl font-semibold font-['Inter'] leading-loose">
            Опис вакансії
          </div>
          <div className="self-stretch">
            <div dangerouslySetInnerHTML={{ __html: vacancy.description }} />
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-[#18191c] text-xl font-semibold font-['Inter'] leading-loose">
            Навички
          </div>
          <div className="justify-center items-center gap-2 inline-flex">
            <div className="flex flex-wrap gap-1.5">
              {vacancy.recommended_skills.map((item: any) => (
                <div className="px-2 py-1 bg-black rounded-lg justify-start items-center gap-1 flex">
                  <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                    {item.uk_name.length > 15
                      ? `${item.uk_name.substring(0, 15)}...`
                      : item.uk_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[393px] h-[148px] px-8 py-5 bg-[#dfdaba] border-t border-[#abb0bc]/20 backdrop-blur-sm flex-col justify-start items-start gap-3 inline-flex">
        <div className="self-stretch px-4 py-3 bg-black rounded-xl justify-center items-center gap-1 inline-flex">
          <button 
            onClick={handleApply}
            disabled={checkIfAlreadyApplied()}
            className={`grow shrink basis-0 text-center text-white text-base font-medium font-['Inter'] leading-normal
              ${checkIfAlreadyApplied() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {checkIfAlreadyApplied() ? 'Ви вже відгукнулись' : 'Відгукнутися'}
          </button>
        </div>
        <Link to="/vacancy" className="self-stretch text-center">
          <div className="self-stretch px-4 py-3 rounded-xl justify-center items-center gap-1 inline-flex">
            <div className=" items-center grow shrink basis-0 text-center text-black text-base font-medium font-['Inter'] leading-normal">
              Назад
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VacancyDetails;