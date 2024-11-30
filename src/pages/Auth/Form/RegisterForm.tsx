import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/FormComponents/Input/Input";
import { useState } from "react";
import Button from "@/components/FormComponents/Button/Button";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [step, setStep] = useState(0);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Невірний формат email")
      .required("Обов'язкове поле"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Обов'язкове поле"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Паролі не співпадають")
      .required("Обов'язкове поле"),
    dataProcessingConsent: Yup.boolean().oneOf([true], "Необхідно погодитись"),
    firstName: Yup.string().required("Обов'язкове поле"),
    lastName: Yup.string().required("Обов'язкове поле"),
    phone: Yup.string().required("Обов'язкове поле"),
  });

  const initialValues = {
    email: "",
    password: "",
    dataProcessingConsent: false,
    firstName: "",
    lastName: "",
    phone: "",
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    setSubmitting(false);
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log("Завершено");
    }
  };

  const renderStep = (formik: any) => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-4 ">
            <h2 className="text-[#000002] h-full text-[28px] font-[700] leading-10">
              Спочатку, зареєструйтесь
            </h2>
            <div className="mt-[86px]">
              <Field
                as={Input}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Email"
                type="email"
                name="email"
                error={formik.errors.email}
              />

              <Field
                as={Input}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Пароль"
                type="password"
                name="password"
                error={formik.errors.password}
              />

              <div className="flex items-center gap-x-2 mt-8">
                <Field
                  type="checkbox"
                  name="dataProcessingConsent"
                  className="w-4 h-4 appearance-none bg-[#E1DECB] border border-black rounded checked:bg-[#E1DECB] checked:border-[#000002] checked:after:content-['✕'] checked:after:absolute checked:after:text-[#000002] checked:after:font-bold checked:after:text-sm checked:after:leading-none checked:after:ml-[2px] relative cursor-pointer"
                />
                <label className="text-sm text-gray-600">
                  Даю згоду на обробку інформації
                </label>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col mt-7">
            <Field
              as={Input}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ім'я"
              name="firstName"
            />
            <Field
              as={Input}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Прізвище"
              name="lastName"
            />
            <Field
              as={Input}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Телефон"
              name="phone"
            />
          </div>
        );
      //   case 2:
      //     return (
      //       <div className="flex flex-col gap-4">
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Країна"
      //           name="country"
      //           onChange={handleInputChange}
      //         />
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Місто"
      //           name="city"
      //           onChange={handleInputChange}
      //         />
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Адреса"
      //           name="address"
      //           onChange={handleInputChange}
      //         />
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Поштовий індекс"
      //           name="postalCode"
      //           onChange={handleInputChange}
      //         />
      //       </div>
      //     );
      //   case 3:
      //     return (
      //       <div className="flex flex-col gap-4">
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Логін"
      //           name="username"
      //           onChange={handleInputChange}
      //         />
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Секретне питання"
      //           name="secretQuestion"
      //           onChange={handleInputChange}
      //         />
      //       </div>
      //     );
      //   case 4:
      //     return (
      //       <div className="flex flex-col gap-4">
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Професія"
      //           name="occupation"
      //           onChange={handleInputChange}
      //         />
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Дата народження"
      //           type="date"
      //           name="birthDate"
      //           onChange={handleInputChange}
      //         />
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Інтереси"
      //           name="interests"
      //           onChange={handleInputChange}
      //         />
      //         <input
      //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      //           placeholder="Про себе"
      //           name="about"
      //           onChange={handleInputChange}
      //         />
      //       </div>
      //     );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="px-6 pt-[39px] pb-[66px] bg-[#E1DECB] h-screen flex flex-col justify-center">
          <div className="mb-6 absolute top-6 w-[327px]">
            {step > 0 && (
              <div className="w-full bg-white rounded-full h-[6px]">
                <div
                  className="bg-[#0F172A] h-[6px] rounded-full"
                  style={{ width: `${(step / 7) * 100}%` }}
                />
                <span className="text-[10px] font-500 uppercase">
                  Крок {step}
                </span>
              </div>
            )}
          </div>

          {step !== 0 && (
            <div className="mt-2 ">
              <h2 className="text-[28px]">Введіть Ваші дані</h2>
            </div>
          )}

          {renderStep(formik)}

          <div className="flex flex-col gap-y-4 justify-between mt-[60px]">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              onClick={() => setStep(step + 1)}
              className="w-full !bg-[#828282] !text-white"
            >
              {step === 4 ? "Завершити" : "Продовжити"}
            </Button>

            {step > 0 ? (
              <Button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-full !bg-[#E1DECB]"
              >
                <span className="text-black">Назад</span>
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  type="button"
                  className="w-full !bg-[#E1DECB] !text-black"
                >
                  <span className="text-black">Назад</span>
                </Button>
              </Link>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
