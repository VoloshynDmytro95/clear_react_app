import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <h2>Chose type of register</h2>
      <div className="flex flex-col items-start gap-y-4">
        <button>Register by diaGov</button>
        <button>Register by Rezerv+</button>
        <Link to="/register/manual">Manual register</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
