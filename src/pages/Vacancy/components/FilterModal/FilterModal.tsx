import { useState } from "react";
import { SearchVacancyPayload, VacancySchedule } from "@/api/types";
import { CloseIcon } from "@/components/icons/CloseIcon";

export type SearchFilters = Omit<SearchVacancyPayload, "skills" | "page">;

interface FilterModalProps {
  onSubmit: (payload: SearchFilters) => void;
  onClose: () => void;
}

const FilterModal = ({ onSubmit, onClose }: FilterModalProps) => {
  const [salaryFrom, setSalaryFrom] = useState<number>(10000);
  const [salaryTo, setSalaryTo] = useState<number>(20000);
  const [schedule, setSchedule] = useState<VacancySchedule>(
    VacancySchedule.FULL_TIME,
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-[480px] max-h-[90vh] flex flex-col">
        <div className="flex justify-end pr-4 pt-2">
          <button
            onClick={onClose}
            className="text-neutral-600 hover:text-black transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="w-full p-3 sm:p-4 bg-white rounded-[20px] border-neutral-300">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-[#333333] text-sm font-semibold">
                    Тип зайнятості
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <label className="py-2 justify-start items-center gap-1 flex cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        value={VacancySchedule.FULL_TIME}
                        checked={schedule === VacancySchedule.FULL_TIME}
                        onChange={(e) =>
                          setSchedule(e.target.value as VacancySchedule)
                        }
                        className="w-5 h-5 rounded-full border-zinc-400 checked:bg-black checked:border-black accent-black"
                      />
                      <span className="text-[#333333] text-sm font-normal leading-tight tracking-tight">
                        Повна
                      </span>
                    </label>
                    <label className="py-2 justify-start items-center gap-1 flex cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        value={VacancySchedule.PART_TIME}
                        checked={schedule === VacancySchedule.PART_TIME}
                        onChange={(e) =>
                          setSchedule(e.target.value as VacancySchedule)
                        }
                        className="w-5 h-5 rounded-full border-zinc-400 checked:bg-black checked:border-black accent-black"
                      />
                      <span className="text-[#333333] text-sm font-normal leading-tight tracking-tight">
                        Неповна
                      </span>
                    </label>
                    <label className="py-2 justify-start items-center gap-1 flex cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        value={VacancySchedule.SHIFT}
                        checked={schedule === VacancySchedule.SHIFT}
                        onChange={(e) =>
                          setSchedule(e.target.value as VacancySchedule)
                        }
                        className="w-5 h-5 rounded-full border-zinc-400 checked:bg-black checked:border-black accent-black"
                      />
                      <span className="text-[#333333] text-sm font-normal leading-tight tracking-tight">
                        Позмінна
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[320px]">
                  <div className="text-[#333333] text-sm font-semibold">
                    Заробітня плата, грн.
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="w-[150px] p-2 bg-white rounded-xl border border-zinc-300 text-sm"
                      placeholder="Від"
                      type="number"
                      min="0"
                      onChange={(e) => setSalaryFrom(parseInt(e.target.value))}
                    />
                    <input
                      className="w-[150px] p-2 bg-white rounded-xl border border-zinc-300 text-sm"
                      placeholder="До"
                      type="number"
                      min="0"
                      onChange={(e) => setSalaryTo(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t">
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors"
            onClick={() => onSubmit({ salaryFrom, salaryTo, schedule })}
          >
            Зберегти фільтри
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
