import api from "@/api/api";

export async function useUserRegister({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await api.auth.register({
      email,
      password,
    });
    console.log(user);
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
