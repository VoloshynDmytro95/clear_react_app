import api from "@/api/api";

export async function usePosition() {
  try {
    const response = await api.position.getAll();
    return response.data as {
      id: string;
      code: string;
      title: string;
    }[];
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}
