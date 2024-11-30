import { useUser } from "@/providers/UserProvider/UserProvider";

const Header = () => {
  const { isAuthenticated } = useUser();

  return (
    <header>
      <div className="flex justify-between px-4">
        <div>Logo</div>
        <div>
          {isAuthenticated ? <button>Logout</button> : <button>Login</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
