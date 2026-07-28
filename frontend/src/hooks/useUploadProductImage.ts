import { useMutation } from "@tanstack/react-query";
import { uploadProductImage } from "../api/upload";

export const useUploadProductImageMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => uploadProductImage(data),
  });

  return {
    uploadProductImage: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
