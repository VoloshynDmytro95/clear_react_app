export interface JobVacancy {
  id: number;
  title: string;
  salary: string;
  companyName: string;
  location: string;
  description: string;
}

export const mockJobVacancies: JobVacancy[] = [
  {
    id: 1,
    title: "Бариста",
    salary: "15 000 - 20 000 грн",
    companyName: "Кава Хаус",
    location: "Одеса, Україна",
    description:
      "Шукаємо досвідченого бариста для роботи в затишній кав'ярні...",
  },
  {
    id: 2,
    title: "Водій", 
    salary: "25 000 - 35 000 грн",
    companyName: "Транспорт Сервіс",
    location: "Дніпро, Україна",
    description:
      "Потрібен водій зі стажем для роботи на корпоративному транспорті...",
  },
  {
    id: 3,
    title: "Full Stack Розробник",
    salary: "100 000 - 130 000 грн",
    companyName: "Діджитал Інновації",
    location: "Харків, Україна",
    description:
      "Приєднуйтесь до нашої команди для роботи над цікавими full stack проектами...",
  },
];
