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
      <button>Login py govUa</button>
      <div>or</div>
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
              placeholder="Email"
              error={errors.email}
            />
            <Input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
