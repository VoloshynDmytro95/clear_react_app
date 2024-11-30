import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="fixed bottom-8 left-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      onClick={() => navigate(-1)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19L8 12L15 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Назад</span>
    </button>
  );
};

export default BackButton;
