import api from "@/api/api";

export async function useMe() {
  try {
    const response = await api.user.me();
    return response;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return null;
  }
}
