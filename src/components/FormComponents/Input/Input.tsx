import { Field } from "formik";
import classNames from "classnames";

const Input = ({ type, name, placeholder, error, className }: any) => {
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
        className={classNames(
          "p-3 rounded-[12px] w-full max-w-[340px] border border-[#CBD5E1] my-[6px]",
          className
        )}
      />
    </div>
  );
};

export default Input;
