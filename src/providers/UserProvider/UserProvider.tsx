import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserContextType {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any | null) => void;
  setMockData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  const mockData = {
    // Крок 1: Особисті дані
    fullName: "Петро Іваненко",
    birthday_date: "1990-05-15",
    email: "petro.ivanenko@example.com",
    phone: "380501234567",
    ubdSeries: "АБ",
    ubdNumber: "123456",

    // Крок 2: Досвід
    position: {
      code: "001",
      id: "db49e538-dce7-4dc1-96a4-a280132c07da",
      title: "Авіаційний спеціаліст",
    },
    skills: [
      {
        en_name: "Aircraft operation and drone piloting",
        id: "33db53e8-40b2-4831-a146-430a9997c2d7",
        uk_name: "Експлуатація літальних апаратів та пілотування БПЛА",
      },
      {
        en_name: "Maintenance of flight systems and equipment",
        id: "b0f6e848-8fdc-4f0b-9e5b-81e3e52a1768",
        uk_name: "Технічне обслуговування льотних систем і обладнання",
      },
      {
        en_name: "Leading and coordinating multi-phase projects",
        id: "4f9bcf01-fdcd-4e28-9faf-0e50e7f101c9",
        uk_name: "Ведення та координація багатофазних проектів",
      },
      {
        en_name: "Supervising and managing diverse teams",
        id: "abdf05f5-46ae-4021-8c21-9e374fa5a935",
        uk_name: "Нагляд та управління різноманітними командами",
      },
      {
        en_name: "Adapting to dynamic work environments",
        id: "ebcd9233-e14a-43ce-b9f6-8a9a68e7b64e",
        uk_name: "Адаптація до динамічного робочого середовища",
      },
    ],
    // Крок 3: Освіта

    hasHigherEducation: true,
    specialty_id: "Teacher Training with Subject Specialisation",
    previousExperience: "2 роки штурмів,деректор ресторану",
  };

  const setMockData = () => {
    setUser(mockData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        setMockData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
