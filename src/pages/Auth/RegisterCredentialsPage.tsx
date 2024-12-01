import Button from "@/components/FormComponents/Button/Button";
import Title from "@/components/GeneralComponents/Title";
import Subtitle from "@/components/GeneralComponents/Subtitle";
import Input from "@/components/FormComponents/Input/Input";
import BackButton from "@/components/GeneralComponents/BackButton";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useRegister } from "@/api/auth/register/useRegister";

const RegisterCredentialsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невірна імейл адреса")
      .required("Обовязкове поле"),
    password: Yup.string()
      .min(8, "Мінімальна довжина паролю 8 символів")
      .required("Обовязкове поле"),
    dataApproval: Yup.boolean()
      .oneOf([true], "Ви повинні погодитися з обробкою персональних даних")
      .required("Обовязкове поле"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    const user = await useRegister({
      email: values.email,
      password: values.password,
    });

    if (user.status === true) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: values.email, password: values.password }),
      );

      setTimeout(() => {
        navigate("/contact-details");
      }, 500);
    }
  };

  return (
    <div className="bg-[#E1DECB] flex flex-col justify-center items-center h-screen">
      <div className="px-6">
        <Title>Спочатку, зареєструйтесь.</Title>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <Formik
          initialValues={{
            email: "",
            password: "",
            dataApproval: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <Input
                type="email"
                inputmode="email"
                autocomplete="email"
                name="email"
                placeholder="Email"
                error={touched.email && errors.email}
              />

              <Input
                type="password"
                inputmode="text"
                autocomplete="new-password"
                name="password"
                placeholder="Пароль"
                error={touched.password && errors.password}
              />

              <div className="flex items-center gap-2">
                <label className="text-sm">
                  <Field
                    type="checkbox"
                    name="dataApproval"
                    id="dataApproval"
                    className="w-4 h-4"
                  />
                  Я погоджуюсь з обробкою персональних даних
                </label>
              </div>

              {touched.dataApproval && errors.dataApproval && (
                <div className="text-[#FE8909] text-[14px] leading-5">
                  {errors.dataApproval}
                </div>
              )}
              <Button
                className={`${Object.keys(errors).length > 0 || Object.keys(touched).length === 0 ? "bg-[#828282]" : "bg-black"} text-white w-[345px]`}
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 ||
                  Object.keys(touched).length === 0
                }
              >
                <p className="text-white flex justify-center">
                  <span>{isLoading ? "Реєстрація..." : "Зареєструватися"}</span>
                </p>
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <BackButton />
    </div>
  );
};

export default RegisterCredentialsPage;
