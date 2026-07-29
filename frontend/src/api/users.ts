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

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(`${USERS_URL}`);
  return response.data;
};

export const getUserById = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`${USERS_URL}/${userId}`);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  const response = await api.delete(`${USERS_URL}/${userId}`);
  return response.data;
};

export const updateUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: Partial<User>;
}): Promise<User> => {
  const response = await api.put<User>(`${USERS_URL}/${userId}`, data);
  return response.data;
};
