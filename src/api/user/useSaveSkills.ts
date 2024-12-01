import api from "@/api/api";

interface SaveSkillsPayload {
  data: any;
}

export async function useSaveSkills(data: SaveSkillsPayload) {
  try {
    const response = await api.user.saveSkills(data);
    console.log("user skills saved:", response);
    return response;
  } catch (error) {
    console.error("Error filling user data:", error);
    throw error;
  }
}
