import { api } from "./axios";
import { UPLOAD_URL } from "../const";

export const uploadProductImage = async (data: FormData): Promise<{ image: string }> => {
  const response = await api.post<{ image: string }>(`${UPLOAD_URL}`, data);
  return response.data;
};
