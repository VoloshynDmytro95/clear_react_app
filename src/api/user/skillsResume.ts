import api from "@/api/api";

export async function useSkillsResume() {
  try {
    const response = await api.user.skillsResume();

    return response;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}
