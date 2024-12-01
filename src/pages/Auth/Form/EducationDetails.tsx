import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Title from "@/components/GeneralComponents/Title";
import Subtitle from "@/components/GeneralComponents/Subtitle";
import Input from "@/components/FormComponents/Input/Input";
import Button from "@/components/FormComponents/Button/Button";
import api from "@/api/api";

const EducationDetails = () => {
  const navigate = useNavigate();
  const [hasHigherEducation, setHasHigherEducation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    specialization: Yup.string().when("hasHigherEducation", {
      is: (val: boolean) => val === true,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    desiredDirections: Yup.string().when("hasHigherEducation", {
      is: (val: boolean) => val === false,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    previousExperience: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await api.user.fillData({
        education: {
          hasHigherEducation,
          ...values,
        },
      });
      navigate("/next-step"); // Replace with actual next route
    } catch (error) {
      console.error("Error submitting education details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#E1DECB] flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <Title>Ваша освіта</Title>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <div className="flex items-center gap-2 mb-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={hasHigherEducation}
              onChange={() => setHasHigherEducation(!hasHigherEducation)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            <span className="ml-3">Я маю вищу освіту</span>
          </label>
        </div>

        <Formik
          initialValues={{
            specialization: "",
            desiredDirections: "",
            previousExperience: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              {hasHigherEducation ? (
                <Input
                  type="text"
                  name="specialization"
                  placeholder="Спеціальність"
                  error={touched.specialization && errors.specialization}
                />
              ) : (
                <Input
                  type="text"
                  name="desiredDirections"
                  placeholder="Бажані напрямки"
                  error={touched.desiredDirections && errors.desiredDirections}
                />
              )}

              <Input
                type="text"
                name="previousExperience"
                placeholder="Попередній досвід роботи"
                error={touched.previousExperience && errors.previousExperience}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="!bg-black text-white w-[345px]"
              >
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EducationDetails;
