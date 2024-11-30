import Button from "@/components/FormComponents/Button/Button";
import Title from "@/components/GeneralComponents/Title";
import Subtitle from "@/components/GeneralComponents/Subtitle";
import Input from "@/components/FormComponents/Input/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCredentialsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate("/login-employer/contact-details");
    }, 500);
  };

  return (
    <div className="bg-[#E1DECB] flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <Title>Текст тайтлу</Title>
        <Subtitle>Текст підзаголовка</Subtitle>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email" />
          <input
            type="email"
            placeholder="Email"
            className="w-[345px] px-4 py-2 rounded border border-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[345px] px-4 py-2 rounded border border-black"
          />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="dataApproval" className="w-4 h-4" />
            <label htmlFor="dataApproval" className="text-sm">
              I agree to the processing of my personal data
            </label>
          </div>
          <Button
            className="!bg-black text-white w-[345px]"
            type="submit"
            disabled={isLoading}
          >
            <p className="text-white flex justify-center">
              <span>{isLoading ? "Loading..." : "Зареєструватися"}</span>
            </p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCredentialsPage;
