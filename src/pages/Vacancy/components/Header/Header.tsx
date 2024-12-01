import { useState, useEffect, useRef } from 'react';
import headerIcon from '../assets/headerIcon.svg'
import avatarIcon from '../assets/avatar.svg'

const VacancyHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-20 px-4 w-full bg-[#dfdaba] shadow justify-between items-center inline-flex">
      <img src={headerIcon} alt="headerIcon" />
      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img src={avatarIcon} alt="avatarIcon" />
        </button>
        
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-[200px] bg-white rounded-md shadow-lg py-1">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Мої вакансії
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Налаштування
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Вийти
            </button>

            <a href="resume" className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Згенерувати резюме
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacancyHeader;
