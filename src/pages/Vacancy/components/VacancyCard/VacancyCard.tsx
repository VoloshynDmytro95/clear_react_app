const VacancyCard = () => {
  return (
    <div>
      <div className="h-36 flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch h-36 p-5 bg-white rounded-[20px] shadow border border-neutral-300 flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch h-[46px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-[#18191c] text-lg font-bold font-['Inter'] leading-[18px]">
              Назва вакансії
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="px-2 py-1 bg-[#c0fecc] rounded-[3px] justify-start items-start gap-2.5 flex">
                <div className="text-[#0ba02c] text-xs font-semibold font-['Inter'] uppercase leading-3">
                  Офіс
                </div>
              </div>
              <div className="text-[#767f8c] text-sm font-medium font-['Inter'] leading-tight">
                40 000 - 50 000 грн.
              </div>
            </div>
          </div>
          <div className="self-stretch justify-center items-end gap-2 inline-flex">
            <div className="grow shrink basis-0 h-[38px] justify-start items-center gap-2 flex">
              <div className="p-2 bg-[#edeff4] rounded-[26.67px] justify-start items-start gap-[6.67px] flex">
                <div className="w-4 h-4 relative" />
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                <div className="self-stretch text-[#3c3c3c] text-sm font-bold font-['Inter'] leading-[14px]">
                  Google Inc.
                </div>
                <div className="w-[233px] h-5 text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                  Київ, Київська обл.
                </div>
              </div>
            </div>
            <div className="w-6 h-6 relative">
              <div className="w-6 h-6 left-0 top-0 absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;
