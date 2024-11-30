import Button from "@/components/FormComponents/Button/Button";
import SecondaryButton from "@/components/FormComponents/Button/SecondaryButton";
import veteranIcon from "./assets/illustration-veteran.png";
import employerIcon from "./assets/illustration-company.png";
import Title from "@/components/GeneralComponents/Title";
import Subtitle from "@/components/GeneralComponents/Subtitle";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#E1DECB] flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <Title>Текст тайтлу</Title>
        <Subtitle>Текст підзаголовка</Subtitle>
      </div>

      <div className="flex flex-col gap-4 mt-20">
        <Button
          className="!bg-black text-white w-[345px]"
          onClick={() => {
            navigate("/register");
          }}
        >
          <p className="text-white flex justify-center">
            <img
              src={veteranIcon}
              alt="veteran"
              className="h-[24px] w-[24px]"
            />
            <span>Для ветеранів</span>
          </p>
        </Button>

        <SecondaryButton
          className="!border-black w-[345px]"
          onClick={() => {
            navigate("/login-employer");
          }}
        >
          <p className="text-black flex justify-center">
            <img
              src={employerIcon}
              alt="employer"
              className="h-[24px] w-[24px]"
            />
            <span>Для роботодавців</span>
          </p>
        </SecondaryButton>
      </div>
    </div>
  );
};

export default HomePage;
