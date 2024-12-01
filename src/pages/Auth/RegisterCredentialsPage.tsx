import Button from "@/components/FormComponents/Button/Button";
import Title from "@/components/GeneralComponents/Title";
import Subtitle from "@/components/GeneralComponents/Subtitle";
import Input from "@/components/FormComponents/Input/Input";
import BackButton from "@/components/GeneralComponents/BackButton";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useRegister } from "@/api/auth/register/useRegister";

const RegisterCredentialsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    // email: Yup.string().email("Invalid email address").required("Required"),
    // password: Yup.string().required("Required"),
    // dataApproval: Yup.boolean()
    //   .oneOf([true], "You must accept the terms")
    //   .required("Required"),
    email: Yup.string(),
    password: Yup.string(),
    dataApproval: Yup.boolean(),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    const user = await useRegister({
      email: values.email,
      password: values.password,
    });

    if (user.status === true) {
      setTimeout(() => {
        navigate("/contact-details");
      }, 500);
    }
  };

  return (
    <div className="bg-[#E1DECB] flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <Title>Текст тайтлу</Title>
        <Subtitle>Текст підзаголовка</Subtitle>
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
                name="email"
                placeholder="Email"
                error={touched.email && errors.email}
              />

              <Input
                type="password"
                name="password"
                placeholder="Password"
                error={touched.password && errors.password}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="dataApproval"
                  id="dataApproval"
                  className="w-4 h-4"
                />
                <label htmlFor="dataApproval" className="text-sm">
                  I agree to the processing of my personal data
                </label>
              </div>

              {touched.dataApproval && errors.dataApproval && (
                <div className="text-[#FE8909] text-[14px] leading-5">
                  {errors.dataApproval}
                </div>
              )}

              <Button
                className="!bg-black text-white w-[345px]"
                type="submit"
                disabled={isLoading}
              >
                <p className="text-white flex justify-center">
                  <span>{isLoading ? "Loading..." : "Зареєструватися"}</span>
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
