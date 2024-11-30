import { Field } from "formik";

const Input = ({ type, name, placeholder, error }: any) => {
  return (
    <div>
      <Field type={type} name={name} placeholder={placeholder} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default Input;
