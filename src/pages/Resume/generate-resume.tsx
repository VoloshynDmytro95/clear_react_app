import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useMe } from "@/api/user/useMe";
import VacancyHeader from "../Vacancy/components/Header/Header";
import { useSkillsResume } from "@/api/user/skillsResume";

interface UserData {
  fullName: string;
  email: string;
  // phone: string;
  skills: string[];
  education: {
    hasHigherEducation: boolean;
    details?: string;
  };
  experience: string;
  specialties: string[];
  specialty: {
    id: string;
    uk_name: string;
  };
}

interface APIResponse {
  coreData?: {
    fullName?: string;
    graduated_university?: boolean;
    previous_experience?: string;
  };
  email?: string;
  skills?: Array<{ uk_name: string }>;
  desired_specialties?: Array<{ uk_name: string }>;
  specialty?: {
    id: string;
    uk_name: string;
  };
}

const ResumeView = ({
  userData,
  aiSummary,
}: {
  userData: UserData;
  aiSummary: string;
}) => {
  return (
    <div
      id="resume-content"
      className="p-4 md:p-8 bg-white w-full md:w-[210mm] min-h-screen md:min-h-[297mm] mx-auto box-border"
      style={{
        padding: "10mm",
      }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
        {userData.fullName}
      </h1>

      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 border-b-2 border-gray-300 pb-1">
          Контакти
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-2">
          <p>
            <span className="font-medium">Email:</span> {userData.email}
          </p>
          {/* <p>
            <span className="font-medium">Phone:</span> {userData.phone}
          </p> */}
        </div>
      </div>

      {aiSummary && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 border-b-2 border-gray-300 pb-1">
            Про мене
          </h2>
          <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">{aiSummary}</p>
        </div>
      )}

      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 border-b-2 border-gray-300 pb-1">
          Професійні навички
        </h2>

        <div className="flex flex-wrap gap-2">
          {userData.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-2 md:px-3 py-1 rounded text-xs md:text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {userData.education.hasHigherEducation && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 border-b-2 border-gray-300 pb-1">
            Освіта
          </h2>
          <p className="font-medium mb-1 text-sm md:text-base">
            {userData.education.hasHigherEducation ? "Вища освіта" : ""}
          </p>
          {userData.education.details && (
            <p className="text-gray-700 text-sm md:text-base"> {userData.specialty.uk_name}</p>
          )}
        </div>
      )}

      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 border-b-2 border-gray-300 pb-1">
          Професійний досвід
        </h2>
        <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
          {userData.experience}
        </p>
      </div>

      {/* <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 border-b-2 border-gray-300 pb-1">
          Desired Positions
        </h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 px-2 md:px-3 py-1 rounded text-xs md:text-sm">
            {userData.specialty.uk_name}
          </span>
        </div>
      </div> */}
    </div>
  );
};

const Generateresume = () => {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    // phone: "",
    skills: [],
    education: {
      hasHigherEducation: false,
      details: "",
    },
    experience: "",
    specialties: [],
    specialty: {
      id: "",
      uk_name: "",
    },
  });

  const [aiSummary, setAiSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [hasGeneratedSummary, setHasGeneratedSummary] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = (await useMe()) as APIResponse;

      setUserData({
        fullName: response.coreData?.fullName || "",
        email: response.email || "",
        // phone: "", // Not provided in API response
        skills: response.skills?.map((skill) => skill.uk_name) || [],
        education: {
          hasHigherEducation: response.coreData?.graduated_university || false,
          details: "", // Specific details not provided in API response
        },
        experience: response.coreData?.previous_experience || "",
        specialty: response?.specialty || {
          id: "",
          uk_name: "",
        },
        specialties:
          response.desired_specialties?.map((specialty) => specialty.uk_name) ||
          [],
      });
    };

    const getAIResumeSummary = async () => {
      const result = await useSkillsResume();
      setAiSummary(result as string);
      setIsGenerating(false);
    };

    fetchUser();
    getAIResumeSummary();
  }, []);

  // useEffect(() => {
  //   const getAIResumeSummary = async () => {
  //     const result = await useSkillsResume();
  //     setAiSummary(result as string);
  //     setIsGenerating(false);
  //   };

  //   getAIResumeSummary();
  // }, []);

  console.log("aiSummary: ", aiSummary);

  const generatePDF = async () => {
    const content = document.getElementById("resume-content");
    if (!content) return;

    const canvas = await html2canvas(content, {
      scale: 2, // Increase quality
      useCORS: true,
      logging: false,
    });

    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, "JPEG", 0, 0, a4Width, a4Height);
    pdf.save(`Резюме ${userData.fullName}.pdf`);
  };

  if (isGenerating) {
    return (
      <>
        <VacancyHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0F172A]/20 border-t-[#0F172A]"></div>
            <p className="text-lg text-[#0F172A] font-medium animate-pulse">
              Генеруємо ваше резюме...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <VacancyHeader />

      <div className="min-h-screen bg-gray-50 py-8">
        <div>
          <div className="flex justify-center md:justify-end mb-4 max-w-[210mm] mx-auto">
            <button
              onClick={generatePDF}
              className="bg-[#0F172A] text-white px-4 py-2 rounded hover:bg-[#1E293B]"
            >
              Завантажити PDF
            </button>
          </div>

          <ResumeView userData={userData} aiSummary={aiSummary} />
        </div>
      </div>
    </>
  );
};

export default Generateresume;
