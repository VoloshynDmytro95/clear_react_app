import api from "@/api/api";

export async function usePosition() {
  try {
    const response = await api.position.getAll();
    return response;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}

export async function usePositionByCode(code: string) {
  const response = await api.position.getSkillsById(code);
  return response;
}
