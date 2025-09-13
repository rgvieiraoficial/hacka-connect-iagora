import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/sign-up", {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const fetchUserById = async (id: string) => {
  const response = await api.get(`auth/users/${id}`);
  return response;
};