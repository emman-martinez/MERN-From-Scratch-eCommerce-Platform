import { api } from "./axios";
import { USERS_URL } from "../const";
import type { User, UserLogin } from "../types/users";

export const userLogin = async ({ email, password }: UserLogin): Promise<User> => {
  const response = await api.post<User>(`${USERS_URL}/auth`, { email, password });
  return response.data;
};
