import api from "@/api/api";
import { SearchVacancyPayload } from "@/api/types";

export async function useGetVacancyById(id: string) {
  try {
    const response = await api.vacancy.getById(id);
    console.log("get vacancy response:", response);
    return response;
  } catch (error) {
    console.error("Error filling user data:", error);
    throw error;
  }
}
