import api from "@/api/api";
import { SearchVacancyPayload } from "@/api/types";

export async function useApplyVacancy(id: string) {
  try {
    const response = await api.vacancy.apply(id);
    console.log("apply vacancy response:", response);
    return response;
  } catch (error) {
    console.error("Error filling user data:", error);
    throw error;
  }
}
