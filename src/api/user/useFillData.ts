import api from "@/api/api";

interface FillDataPayload {
  fullName: string;
  ubd: string;
  phone: string;
  birthday_date: string;
}

export async function useFillData(data: FillDataPayload) {
  try {
    const response = await api.user.fillData(data);
    console.log("user data filled:", response);
    return response;
  } catch (error) {
    console.error("Error filling user data:", error);
    throw error;
  }
}
