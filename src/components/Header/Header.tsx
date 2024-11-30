import { useUser } from "@/providers/UserProvider/UserProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated } = useUser();

  return (
    <header className="bg-white w-full">
      <div className="flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobBoard
        </Link>
        <div>
          {isAuthenticated ? (
            <Link to="/">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 transition duration-200">
                Logout
              </button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 transition duration-200">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 transition duration-200">
                  Register
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
