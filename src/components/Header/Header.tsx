import { useUser } from "@/providers/UserProvider/UserProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated } = useUser();

  return (
    <header className="bg-[#332F21] w-full">
      <div className="flex justify-between items-center py-4 px-3">
        <Link to="/" className="text-2xl font-bold text-white">
          Є Робота+
        </Link>
        <div>
          {isAuthenticated ? (
            <Link to="/">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 transition duration-200">
                Вийти
              </button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="bg-[#EFDB2B] font-semibold py-2 px-4 transition duration-200">
                  Логін
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 transition duration-200">
                  Реєстрація
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
