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
    fullName: "Петро Іваненко Іванович",
    birthday_date: "1990-05-15",
    email: "petro.ivanenko@example.com",
    phone: "380501234567",
    ubdSeries: "АБ",
    ubdNumber: "123456",

    // Крок 2: Досвід
    position: {
      code: "001",
      id: "2406a879-69f7-4247-816b-8af5f8eed0ae",
      title: "Діловод-статистик ",
    },
    skills: [
      {
        en_name: "Writing concise and actionable reports",
        id: "0426ba2c-d57e-402d-ac18-cf3205a5cc2e",
        uk_name: "Написання лаконічних і практичних звітів",
      },
      {
        en_name: "Document management and record-keeping",
        id: "f02cf558-3299-4ae1-9e13-61a92cddaa0a",
        uk_name: "Документообіг та діловодство",
      },
      {
        en_name: "Administrative coordination",
        id: "6486f7ad-f1bf-4d9d-92c8-f46e3aeef359",
        uk_name: "Адміністративна координація",
      },
      {
        en_name: "Communication with staff and clients",
        id: "4bc8ac37-6f83-40e7-a3b6-d02802900a46",
        uk_name: "Спілкування з персоналом і клієнтами",
      },
      {
        en_name: "Basic statistical analysis",
        id: "11c99e4a-a427-4b23-b55e-53710bfbd6e2",
        uk_name: "Базовий статистичний аналіз",
      }
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
