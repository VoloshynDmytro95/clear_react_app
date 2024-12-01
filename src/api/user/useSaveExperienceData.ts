import api from "@/api/api";

interface SaveExperienceDataPayload {
  data: any;
}

export async function useSaveExperienceData(data: SaveExperienceDataPayload) {
  try {
    const response = await api.user.saveExperienceData(data);
    console.log("user data saved:", response);
    return response;
  } catch (error) {
    console.error("Error filling user data:", error);
    throw error;
  }
}
