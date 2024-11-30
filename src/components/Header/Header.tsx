import { useUser } from "@/providers/UserProvider/UserProvider";

const Header = () => {
  const { isAuthenticated } = useUser();

  return (
    <header className="bg-white w-full">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-blue-600">JobBoard</div>
        <div>
          {isAuthenticated ? (
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 transition duration-200">
              Logout
            </button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 transition duration-200">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
