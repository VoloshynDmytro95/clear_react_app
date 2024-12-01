import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  skills: string[];
  education: {
    hasHigherEducation: boolean;
    details?: string;
  };
  experience: string;
  specialties: string[];
}

const mockUserData: UserData = {
  fullName: "Іван Петренко",
  email: "ivan.petrenko@example.com",
  phone: "+380 99 123 45 67",
  address: "вул. Хрещатик, 1",
  city: "Київ",
  skills: ["JavaScript", "React", "TypeScript", "Node.js", "HTML/CSS"],
  education: {
    hasHigherEducation: true,
    details:
      "Бакалавр комп'ютерних наук, Київський національний університет імені Тараса Шевченка",
  },
  experience:
    "Понад 5 років досвіду розробки веб-додатків. Працював над численними проектами з використанням сучасних JavaScript фреймворків та бібліотек. Керував командами розробників та менторив молодших спеціалістів.",
  specialties: [
    "Frontend розробник",
    "Full Stack розробник",
    "React розробник",
  ],
};

const ResumeView = ({ userData }: { userData: UserData }) => {
  return (
    <div 
      id="resume-content" 
      className="p-8 bg-white"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        padding: "20mm",
        boxSizing: "border-box"
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">{userData.fullName}</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">Contact Information</h2>
        <div className="grid grid-cols-2 gap-2">
          <p><span className="font-medium">Email:</span> {userData.email}</p>
          <p><span className="font-medium">Phone:</span> {userData.phone}</p>
          <p className="col-span-2">
            <span className="font-medium">Location:</span> {userData.city}, {userData.address}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {userData.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">Education</h2>
        <p className="font-medium mb-1">
          {userData.education.hasHigherEducation
            ? "Higher Education"
            : "Secondary Education"}
        </p>
        {userData.education.details && <p className="text-gray-700">{userData.education.details}</p>}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">Professional Experience</h2>
        <p className="text-gray-700 whitespace-pre-line">{userData.experience}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-1">Desired Positions</h2>
        <div className="flex flex-wrap gap-2">
          {userData.specialties.map((specialty, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Generateresume = () => {
  const generatePDF = async () => {
    const content = document.getElementById("resume-content");
    if (!content) return;

    const canvas = await html2canvas(content, {
      scale: 2, // Increase quality
      useCORS: true,
      logging: false
    });

    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, "JPEG", 0, 0, a4Width, a4Height);
    pdf.save("resume.pdf");
  };

  return (
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

        <ResumeView userData={mockUserData} />
      </div>
    </div>
  );
};

export default Generateresume;
