import api from "@/api/api";

export async function useLogout() {
  try {
    const response = await api.auth.logout();
    console.log("user logout:", response);
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
