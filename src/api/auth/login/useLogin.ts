import api from "@/api/api";

export async function useLogin({
  email,
  password,
  rememberMe,
}: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    const user = await api.auth.login({
      email,
      password,
      rememberMe,
    });
    console.log("user login:", user);
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
