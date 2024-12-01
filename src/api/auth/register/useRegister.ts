import api from "@/api/api";

export async function useRegister({
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
    console.log("user register:", user);
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
