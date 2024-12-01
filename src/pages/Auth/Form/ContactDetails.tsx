import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const ContactDetails = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const positions = [
    "Розробник",
    "Дизайнер",
    "Менеджер",
    "Аналітик",
    // додайте інші посади
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Обов'язкове поле"),
    date: Yup.string().required("Обов'язкове поле"),
    email: Yup.string()
      .email("Невірний формат email")
      .required("Обов'язкове поле"),
    phone: Yup.string().required("Обов'язкове поле"),
    ubdSeries: Yup.string().required("Обов'язкове поле"),
    ubdNumber: Yup.string().required("Обов'язкове поле"),
    address: Yup.string().when("step", {
      is: 1,
      then: () => Yup.string().required("Обов'язкове поле"),
    }),
    city: Yup.string().when("step", {
      is: 1,
      then: () => Yup.string().required("Обов'язкове поле"),
    }),
    additionalInfo: Yup.string().when("step", {
      is: 2,
      then: () => Yup.string().required("Обов'язкове поле"),
    }),
    position: Yup.string().required("Обов'язкове поле"),
  });

  const initialValues = {
    fullName: "",
    date: "",
    email: "",
    phone: "",
    ubdSeries: "",
    ubdNumber: "",
    address: "",
    city: "",
    additionalInfo: "",
    position: "",
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(false);
    if (step < 2) {
      setStep(step + 1);
    } else {
      console.log("Завершено");
    }
  };

  const renderProgressBar = (currentStep: number) => {
    const width =
      currentStep === 0 ? "21px" : currentStep === 1 ? "166px" : "332px";
    return (
      <div className="w-[332px] h-1.5 relative">
        <div className="w-[332px] h-1.5 left-0 top-0 absolute bg-slate-100 rounded-[40px]" />
        <div
          className={`h-1.5 left-0 top-0 absolute bg-slate-900 rounded-[40px]`}
          style={{ width }}
        />
      </div>
    );
  };

  const renderFormFields = () => {
    if (step === 0) {
      return (
        <div className="self-stretch h-[398px] flex-col justify-start items-start gap-3 flex">
          <Field name="fullName">
            {({ field }: any) => (
              <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
                <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                  ПІБ
                </div>
                <input
                  {...field}
                  className="self-stretch p-3 bg-white rounded-xl border border-slate-300"
                  placeholder="Ім'я"
                />
              </div>
            )}
          </Field>
          <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
            <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
              Дата
            </div>
            <div className="self-stretch p-3 bg-white rounded-xl border border-slate-300 justify-start items-center inline-flex">
              <div className="grow shrink basis-0 text-slate-400 text-sm font-normal font-['Inter'] leading-tight">
                дд.мм.рр
              </div>
            </div>
          </div>
          <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
            <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
              Email
            </div>
            <div className="self-stretch p-3 bg-white rounded-xl border border-slate-300 justify-start items-center inline-flex">
              <div className="grow shrink basis-0 text-slate-400 text-sm font-normal font-['Inter'] leading-tight">
                Email
              </div>
            </div>
          </div>
          <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
            <div className="self-stretch text-slate-900 text-sm font-medium font-['Inter'] leading-tight">
              Номер телефона
            </div>
            <div className="self-stretch p-3 bg-white rounded-xl border border-slate-300 justify-start items-center inline-flex">
              <div className="grow shrink basis-0 text-slate-400 text-sm font-normal font-['Inter'] leading-tight">
                380
              </div>
            </div>
          </div>
          <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
            <div className="self-stretch text-slate-900 text-sm font-medium font-['Inter'] leading-tight">
              Персональний УБД
            </div>
            <div className="self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="h-11 p-3 bg-white rounded-xl border border-slate-300 justify-start items-center flex">
                <div className="grow shrink basis-0 text-slate-400 text-sm font-normal font-['Inter'] leading-tight">
                  Серія
                </div>
              </div>
              <div className="grow shrink basis-0 h-11 p-3 bg-white rounded-xl border border-slate-300 justify-start items-center flex">
                <div className="grow shrink basis-0 text-slate-400 text-sm font-normal font-['Inter'] leading-tight">
                  Номер
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="self-stretch h-[228px] flex-col justify-start items-start gap-3 flex">
          <Field name="position">
            {({ field, form }: any) => (
              <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
                <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                  Посада
                </div>
                <div className="relative w-full">
                  <select
                    {...field}
                    className="self-stretch w-full p-3 bg-white rounded-xl border border-slate-300 appearance-none"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <option value="">Оберіть посаду</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                  {field.value && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => form.setFieldValue('position', '')}
                    >
                      <IoMdClose className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </Field>

          <Field name="position">
            {({ field }: any) => (
              field.value && (
                <div className="self-stretch h-[146px] flex-col justify-start items-start gap-1.5 flex">
                  <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                    Цивільні Навички
                  </div>
                  <div className="self-stretch h-[120px] p-3 bg-white rounded-xl border border-slate-300 flex-col justify-center items-start gap-3 flex">
                    <div className="self-stretch justify-start items-start gap-2 inline-flex">
                      <div className="px-2 py-1 bg-black rounded-lg justify-start items-center gap-1 flex">
                        <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                          навичка1
                        </div>
                        <div className="w-4 h-4 relative" />
                      </div>
                      <div className="px-2 py-1 bg-black rounded-lg justify-start items-center gap-1 flex">
                        <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                          Fff
                        </div>
                        <div className="w-4 h-4 relative" />
                      </div>
                      <div className="px-2 py-1 bg-black rounded-lg justify-start items-center gap-1 flex">
                        <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                          Fff
                        </div>
                        <div className="w-4 h-4 relative" />
                      </div>
                      <div className="px-2 py-1 bg-black rounded-lg justify-start items-center gap-1 flex">
                        <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                          навичка2
                        </div>
                        <div className="w-4 h-4 relative" />
                      </div>
                      <div className="px-2 py-1 bg-black rounded-lg justify-start items-center gap-1 flex">
                        <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
                          Fff
                        </div>
                        <div className="w-4 h-4 relative" />
                      </div>
                    </div>
                    <div className="self-stretch text-slate-400 text-sm font-normal font-['Inter'] leading-tight">
                      Додайте...
                    </div>
                  </div>
                </div>
              )
            )}
          </Field>
        </div>
      );
    }

    return (
      <div className="self-stretch h-[398px] flex-col justify-start items-start gap-3 flex">
        <Field name="additionalInfo">
          {({ field }: any) => (
            <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
              <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                Додаткова інформація
              </div>
              <textarea
                {...field}
                className="self-stretch p-3 bg-white rounded-xl border border-slate-300 min-h-[150px]"
                placeholder="Введіть додаткову інформацію"
              />
            </div>
          )}
        </Field>
      </div>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div className="w-full h-[852px] px-6 pt-6 pb-[66px] bg-[#e1decb] flex-col justify-start items-center inline-flex">
            <div className="self-stretch h-[762px] flex-col justify-between items-center inline-flex">
              <div className="self-stretch h-[92px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch h-7 flex-col justify-center items-start gap-1 flex">
                  <div className="p-1 flex-col justify-start items-start gap-1 flex">
                    {renderProgressBar(step)}
                  </div>
                  <div className="self-stretch text-[#000002] text-[10px] font-medium font-['Inter'] uppercase leading-[10px]">
                    крок {step + 1}
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-[#000002] text-[28px] font-bold font-['Inter'] leading-10">
                    {step === 0
                      ? "Введіть Ваші дані"
                      : step === 1
                        ? "Ваш досвід"
                        : "Додаткова інформація"}
                  </div>
                  <div className="px-1.5 justify-center items-center flex">
                    <div className="text-black text-[28px] font-bold font-['Inter'] leading-10">
                      {step === 0 ? "✍️" : step === 1 ? "🌟" : "✍️"}
                    </div>
                  </div>
                </div>
              </div>
              {renderFormFields()}
              <div className="self-stretch h-[111px] flex-col justify-start items-center gap-[46px] flex">
                <div className="self-stretch h-[111px] flex-col justify-start items-start gap-[15px] flex">
                  <button
                    type="submit"
                    className="self-stretch px-4 py-3 bg-[#828282] rounded-xl"
                  >
                    <div
                      className="text-center text-white text-base font-medium font-['Inter']"
                      onClick={() => setStep(step + 1)}
                    >
                      Продовжити
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (step <= 1) {
                        navigate("/register-employee");
                      }
                      setStep(Math.max(0, step - 1));
                    }}
                    className="self-stretch px-4 py-3 rounded-xl"
                  >
                    <div className="text-center text-black text-base font-medium font-['Inter']">
                      Назад
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactDetails;
