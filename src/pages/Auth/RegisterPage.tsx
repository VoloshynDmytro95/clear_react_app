import Button from "@/components/FormComponents/Button/Button";
import SecondaryButton from "@/components/FormComponents/Button/SecondaryButton";
import { useNavigate } from "react-router-dom";
import govIcon from "@/pages/Home/assets/illustration-idgovua.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#E1DECB] flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <h2>Title text</h2>
        <h3>Subtitle text</h3>
      </div>
      <div className="flex flex-col gap-4  mt-20">
        <Button
          className="!bg-black text-white w-[345px]"
          onClick={() => {
            navigate("/register-form");
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
            navigate("/register-form");
          }}
        >
          <p className="text-black flex justify-center">
            <span>Реєстрація без документів</span>
          </p>
        </SecondaryButton>
      </div>
    </div>
  );
};

export default RegisterPage;
