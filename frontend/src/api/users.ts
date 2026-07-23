import { api } from "./axios";
import { USERS_URL } from "../const";
import type { User, UserLogin } from "../types/users";

export const userLogin = async ({ email, password }: UserLogin): Promise<User> => {
  const response = await api.post<User>(`${USERS_URL}/auth`, { email, password });
  return response.data;
};

export const userLogout = async (): Promise<void> => {
  const response = await api.post(`${USERS_URL}/logout`);

  return response.data;
};

export const userRegister = async ({ name, email, password }: User): Promise<User> => {
  const response = await api.post<User>(`${USERS_URL}`, { name, email, password });
  return response.data;
};

export const updateUserProfile = async ({
  userId,
  data,
}: {
  userId: string;
  data: Partial<User>;
}): Promise<User> => {
  const response = await api.put<User>(`${USERS_URL}/profile/${userId}`, data);
  return response.data;
};
