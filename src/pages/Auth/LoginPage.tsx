import { Formik, Form, Field } from "formik";
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
        {({ errors, touched }: any) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            {errors.email && touched.email && <div>{errors.email}</div>}

            <Field type="password" name="password" placeholder="Password" />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}

            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
