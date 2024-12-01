import api from "@/api/api";
import { SearchVacancyPayload } from "@/api/types";

export async function useSearchVacancy(data: SearchVacancyPayload) {
  try {
    const response = await api.vacancy.search(data);
    console.log("search vacancy response:", response);
    return response;
  } catch (error) {
    console.error("Error filling user data:", error);
    throw error;
  }
}
