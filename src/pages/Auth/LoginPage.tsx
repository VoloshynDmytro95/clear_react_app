import Button from "@/components/FormComponents/Button/Button";
import Input from "@/components/FormComponents/Input/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Невірний формат email")
    .required("Обов'язкове поле"),
  password: Yup.string().required("Обов'язкове поле"),
});

const LoginPage = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ errors }: any) => (
          <Form>
            <Input
              type="email"
              name="email"
              placeholder="Імейл"
              error={errors.email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              error={errors.password}
            />
            <Button title="Login" onClick={() => {}} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
