import { Field } from "formik";

const Input = ({ type, name, placeholder, error }: any) => {
  return (
    <div>
      <label className="text-[14px] text-[#0F172A] font-[500] leading-5 flex justify-between">
        {placeholder}

        {error && (
          <div className="text-[#FE8909] text-[14px] leading-5">{error}</div>
        )}
      </label>

      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="p-3 rounded-[12px] w-full max-w-[340px] border border-[#CBD5E1] my-[6px]"
      />
    </div>
  );
};

export default Input;
