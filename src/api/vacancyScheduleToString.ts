import { VacancySchedule } from "@/api/types";

export const vacancyScheduleToString = (schedule: VacancySchedule) => {
  switch (schedule) {
    case VacancySchedule.FULL_TIME:
      return "Повний день";
    case VacancySchedule.PART_TIME:
      return "Неповний день";
    case VacancySchedule.SHIFT:
      return "Позмінний графік";
    case VacancySchedule.INTERN:
      return "Стажування";
    case VacancySchedule.REMOTE:
      return "Віддалена";
    case VacancySchedule.SEASONAL:
      return "Сезонна";
    case VacancySchedule.PROJECT:
      return "Проектна";
    case VacancySchedule.HYBRID:
      return "Гібридна";
    case VacancySchedule.OFFICE:
      return "Офісна";
    default:
      return "";
  }
};
