import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import apiEndpoints from "@/api/api";

import Input from "../../../components/FormComponents/Input/Input";

import { useSaveCoreData } from "@/api/user/useSaveCoreData";
import { useSaveSkills } from "@/api/user/useSaveSkills";
import { useSaveExperienceData } from "@/api/user/useSaveExperienceData";
import { useSpecialty } from "@/api/specialty/useSpecialty";

const IS_AUTHENTICATED_BY_GOVUA = true;

import { usePositionByCode } from "@/api/position/usePosition";

const ContactDetails = () => {
  const [positions, setPositions] = useState<
    {
      id: string;
      code: string;
      title: string;
    }[]
  >([]);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hasHigherEducation, setHasHigherEducation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedPositionTitle, setSelectedPositionTitle] =
    useState<string>("");
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null);
  const [selectedSpecialtyTitle, setSelectedSpecialtyTitle] =
    useState<string>("");

  console.log(selectedPosition);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    apiEndpoints.position.getAll().then((res) => {
      setPositions(res);
    });
    apiEndpoints.specialty.getAll().then((res) => {
      setSpecialties(res);
    });
  }, []);

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

  interface FormValues {
    fullName: string;
    birthday_date: string;
    email: string;
    phone: string;
    ubdSeries: string;
    ubdNumber: string;
    address: string;
    city: string;
    additionalInfo: string;
    position: string;
    skills: string[];
    hasHigherEducation: boolean;
    previousExperience: string;
    desiredSpecialties: string[];
  }

  const initialValues: FormValues = {
    fullName: "",
    birthday_date: "",
    email: "",
    phone: "",
    ubdSeries: "",
    ubdNumber: "",
    address: "",
    city: "",
    additionalInfo: "",
    position: "",
    skills: [],
    hasHigherEducation: false,
    previousExperience: "",
    desiredSpecialties: [],
  };

  const handleNavigate = async (values: FormValues) => {
    console.log("[Formik Data]:", values);

    switch (step) {
      case 0:
        const { fullName, birthday_date, phone, ubdSeries, ubdNumber } = values;
        const payloadContactInfo = {
          fullName,
          birthday_date,
          phone: phone,
          ubd: `${ubdSeries} ${ubdNumber}`,
        };

        await useSaveCoreData({
          data: payloadContactInfo,
        });

        setStep(step + 1);
        break;

      case 1:
        const payloadSkills = {
          skills: selectedPosition.map((skill) => skill.id),
        };

        await useSaveSkills({
          data: payloadSkills,
        });

        setStep(step + 1);
        break;

      case 2:
        const {
          hasHigherEducation: graduated_university,
          previousExperience: previous_experience,
        } = values;

        interface ExperienceData {
          graduated_university: boolean;
          specialtyId?: string;
          previous_experience?: string;
          desiredSpecialties?: string[];
        }

        const payloadExperienceData = {
          data: {
            graduated_university,
            ...(selectedSpecialty?.id &&
              graduated_university && {
                specialty_id: selectedSpecialty.id,
              }),
            ...(selectedSpecialty?.id &&
              !graduated_university && {
                desired_specialties: [selectedSpecialty.id],
              }),
            ...(previous_experience && { previous_experience }),
          } as ExperienceData,
        };

        await useSaveExperienceData(payloadExperienceData);

        setTimeout(() => {
          navigate("/vacancy");
        }, 500);

        break;

      default:
        break;
    }
  };

  const handleBack = () => {
    if (step < 1) {
      navigate("/");
    }

    setStep(Math.max(0, step - 1));
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
        <div className="self-stretch flex-col justify-start items-start gap-3 flex">
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

          <Field name="birthday_date">
            {({ field, form }: any) => (
              <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
                <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                  Дата
                </div>

                <input
                  {...field}
                  type="date"
                  pattern="\d{4}-\d{2}-\d{2}"
                  className="self-stretch p-3 bg-white rounded-xl border border-slate-300"
                  onChange={(e) => {
                    form.setFieldValue("birthday_date", e.target.value);
                  }}
                  onClick={(e) => {
                    e.currentTarget.focus();
                  }}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                />

                {form.errors.birthday_date && form.touched.birthday_date && (
                  <div className="text-red-500 text-sm">
                    {form.errors.birthday_date}
                  </div>
                )}
              </div>
            )}
          </Field>

          {!IS_AUTHENTICATED_BY_GOVUA && (
            <Field name="email">
              {({ field }: any) => (
                <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
                  <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                    Email
                  </div>
                  <input
                    {...field}
                    className="self-stretch p-3 bg-white rounded-xl border border-slate-300"
                    placeholder="Email"
                  />
                </div>
              )}
            </Field>
          )}

          <Field name="phone">
            {({ field }: any) => (
              <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
                <div className="self-stretch text-slate-900 text-sm font-medium font-['Inter'] leading-tight">
                  Номер телефона
                </div>

                <input
                  {...field}
                  className="self-stretch p-3 bg-white rounded-xl border border-slate-300"
                  placeholder="380"
                />
              </div>
            )}
          </Field>

          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <div className="w-full text-slate-900 text-sm font-medium font-['Inter'] leading-tight">
              Персональний УБД
            </div>
            <div className="w-full flex gap-2">
              <Field name="ubdSeries">
                {({ field }: any) => (
                  <input
                    {...field}
                    className="w-[30%] p-3 bg-white rounded-xl border border-slate-300"
                    placeholder="Серія"
                  />
                )}
              </Field>

              <Field name="ubdNumber">
                {({ field }: any) => (
                  <input
                    {...field}
                    className="w-[70%] p-3 bg-white rounded-xl border border-slate-300"
                    placeholder="Номер"
                  />
                )}
              </Field>
            </div>
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="self-stretch min-h-[228px] flex-col justify-start items-start gap-3 flex">
          <Field name="position">
            {({ field, form }: any) => (
              <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
                <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                  Посада
                </div>
                <div className="relative w-full">
                  <div
                    className="self-stretch w-full p-3 bg-white rounded-xl border border-slate-300 cursor-pointer flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span
                      className={`${selectedPositionTitle ? "text-black" : "text-slate-400"} truncate flex-1 mr-2`}
                    >
                      {selectedPositionTitle || "Оберіть посаду"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-xl shadow-lg">
                      <div className="p-2 border-b">
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          placeholder="Пошук..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div
                        className="overflow-y-auto"
                        style={{ maxHeight: "200px" }}
                      >
                        {positions
                          .filter((pos) =>
                            pos.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((pos) => (
                            <div
                              key={pos.code}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100 truncate"
                              onClick={() => {
                                setSelectedPositionTitle(pos.title);

                                usePositionByCode(pos.id).then((res) => {
                                  form.setFieldValue("position", pos.id);
                                  setSelectedPosition(res);
                                  setIsOpen(false);
                                  setSearchTerm("");
                                });
                              }}
                            >
                              {pos.title}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Field>

          <Field name="position">
            {({ field, form }: any) =>
              selectedPositionTitle && (
                <div className="self-stretch flex-col justify-start items-start gap-1.5 flex mb-4">
                  <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                    Цивільні навички
                  </div>
                  <div className="self-stretch p-3 bg-white rounded-xl border border-slate-300 flex-col justify-start items-start gap-3 flex">
                    <div className="self-stretch flex flex-wrap gap-2">
                      {selectedPosition &&
                        selectedPosition.map((skill, index) => (
                          <div
                            key={index}
                            className="px-2 py-1 bg-black rounded-lg flex items-center gap-1"
                            title={skill.uk_name}
                          >
                            <div className="text-white text-sm font-normal font-['Inter']">
                              {skill.uk_name.length > 10
                                ? `${skill.uk_name.substring(0, 32)}...`
                                : skill.uk_name}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const newSelectedPosition =
                                  selectedPosition.filter(
                                    (_, i) => i !== index
                                  );
                                setSelectedPosition(newSelectedPosition);
                              }}
                              className="w-4 h-4 flex items-center justify-center"
                            >
                              <IoMdClose className="text-white w-3 h-3" />
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className="self-stretch flex items-center gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && newSkill.trim()) {
                            e.preventDefault();
                            const newSkillObject = {
                              en_name: newSkill.trim(),
                              id: Date.now().toString(),
                              uk_name: newSkill.trim(),
                            };
                            setSelectedPosition([
                              ...selectedPosition,
                              newSkillObject,
                            ]);
                            setNewSkill("");
                          }
                        }}
                        className="flex-1 p-2 border border-slate-300 rounded-lg text-sm"
                        placeholder="Додати навичку..."
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newSkill.trim()) {
                            const newSkillObject = {
                              en_name: newSkill.trim(),
                              id: Date.now().toString(),
                              uk_name: newSkill.trim(),
                            };
                            setSelectedPosition([
                              ...selectedPosition,
                              newSkillObject,
                            ]);
                            setNewSkill("");
                          }
                        }}
                        className="px-3 py-1 bg-black text-white rounded-lg text-sm"
                      >
                        Додати
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          </Field>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 mt-10 w-full">
        <div className="flex justify-between gap-2 mb-4">
          <span className="ml-3" style={{ margin: 0 }}>
            Я маю вищу освіту
          </span>

          <Field name="hasHigherEducation">
            {({ field }: any) => (
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  name="hasHigherEducation"
                  type="checkbox"
                  className="sr-only peer"
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA573F]"></div>
              </label>
            )}
          </Field>
        </div>

        <Field name={"specialty"}>
          {({ field, form }: any) => (
            <div
              className="self-stretch flex-col justify-start items-start gap-1.5 flex"
              ref={dropdownRef}
            >
              <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                {form.values.hasHigherEducation
                  ? "Спеціальність"
                  : "Бажаний напрямок"}
              </div>

              <div className="relative w-full">
                <div
                  className="self-stretch w-full p-3 bg-white rounded-xl border border-slate-300 cursor-pointer flex justify-between items-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span
                    className={`${selectedSpecialtyTitle ? "text-black" : "text-slate-400"} truncate flex-1 mr-2`}
                  >
                    {selectedSpecialtyTitle || "Оберіть спеціальність"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {isOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-xl shadow-lg">
                    <div className="p-2 border-b">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Пошук..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div
                      className="overflow-y-auto"
                      style={{ maxHeight: "200px" }}
                    >
                      {specialties
                        .filter((specialty) =>
                          specialty.uk_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((specialty) => (
                          <div
                            key={specialty.id}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 truncate"
                            onClick={() => {
                              setSelectedSpecialty(specialty);
                              setSelectedSpecialtyTitle(specialty.uk_name);
                              form.setFieldValue("specialty", specialty.id);
                              setIsOpen(false);
                              setSearchTerm("");
                            }}
                          >
                            {specialty.uk_name}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Field>

        <Field name="previousExperience">
          {({ field, form }: any) => (
            <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
              <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                Попередній досвід роботи
              </div>

              <input
                {...field}
                type="text"
                className="self-stretch p-3 bg-white rounded-xl border border-slate-300"
                placeholder="Попередній досвід роботи"
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
          <div className="w-full px-6 pt-6 pb-[66px] min-h-screen bg-[#e1decb] flex-col justify-start items-center inline-flex">
            <div className="w-full flex-col justify-between items-center inline-flex">
              <div className="w-full mb-6 flex-col justify-start items-start gap-6 flex">
                <div className=" flex-col justify-center items-start gap-1 flex">
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
                        : "Ваша освіта"}
                  </div>
                  <div className="px-1.5 justify-center items-center flex">
                    <div className="text-black text-[28px] font-bold font-['Inter'] leading-10">
                      {step === 0 ? "✍️" : step === 1 ? "🌟" : "🎓"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mb-8">{renderFormFields()}</div>
              <div className="w-full mt-auto">
                <div className="w-full flex-col justify-start items-start gap-[15px] flex">
                  <button
                    onClick={() => handleNavigate(formik.values as any)}
                    className="w-full px-4 py-3 bg-black rounded-xl"
                  >
                    <div className="text-center text-white text-base font-medium font-['Inter']">
                      Продовжити
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full px-4 py-3 rounded-xl"
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
