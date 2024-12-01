import { Link } from "react-router-dom";

import Button from "@/components/FormComponents/Button/Button";
import SecondaryButton from "@/components/FormComponents/Button/SecondaryButton";
import govIcon from "@/pages/Home/assets/illustration-idgovua.png";
import employerIcon from "../../pages/Home/assets/illustration-company.png";

import { useNavigate } from "react-router-dom";
import { LoadingModal } from "@/animations/loading";
import { useRegister } from "@/api/auth/register/useRegister";
import { useState } from "react";
import { useUser } from "@/providers/UserProvider/UserProvider";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setMockData } = useUser();

  const generateRandomCredentials = () => {
    setIsLoading(true);
    const randomString = Math.random().toString(36).substring(2, 10);
    const email = `user_${randomString}@example.com`;
    const password =
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10);

    localStorage.setItem("tempEmail", email);
    localStorage.setItem("tempPassword", password);

    useRegister({ email, password });
    // імітація загрузки
    setMockData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setTimeout(() => {
      navigate("/register-by-dia");
    }, 2500);
  };

  return (
    <div className="bg-[#E1DECB] flex flex-col justify-center items-center h-screen">
      <LoadingModal isOpen={isLoading} onClose={() => {}} />
      <div className="text-center px-6">
        <h1 className="text-[28px] font-[700] leading-10">єМайбутнє</h1>
        <p className="text-[16px] font-[400] leading-7">
          Платформа, яка допомагає ветеранам знайти гідну цивільну роботу,
          адаптуючи їхні військові навички до потреб сучасного ринку праці
        </p>
      </div>

      <div className="flex flex-col gap-4  mt-20">
        <Button
          className="!bg-black text-white w-[345px]"
          onClick={() => {
            const credentials = generateRandomCredentials();
            // navigate("/register-by-dia");
          }}
        >
          <p className="text-white flex justify-center">
            <span>Продовжити з </span>
            <img src={govIcon} alt="gov icon" className="h-[24px] ml-2" />
          </p>
        </Button>

        <SecondaryButton
          className="!border-black w-[345px]"
          onClick={() => {
            navigate("/register-employee");
          }}
        >
          <p className="text-black flex justify-center">
            <span>Реєстрація без документів</span>
          </p>
        </SecondaryButton>
      </div>

      <Link to="/login-employer">
        <p className="text-black flex justify-center mt-10">
          <img
            src={employerIcon}
            alt="employer"
            className="h-[24px] w-[24px]"
          />
          <span>Я Роботодавець</span>
        </p>
      </Link>
    </div>
  );
};

export default RegisterPage;
