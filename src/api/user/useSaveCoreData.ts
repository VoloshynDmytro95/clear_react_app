import api from "@/api/api";

interface SaveCoreDataPayload {
  data: any;
}

export async function useSaveCoreData(data: SaveCoreDataPayload) {
  try {
    const response = await api.user.saveCoreData(data);
    console.log("user data saved:", response);
    return response;
  } catch (error) {
    console.error("Error filling user data:", error);
    throw error;
  }
}
