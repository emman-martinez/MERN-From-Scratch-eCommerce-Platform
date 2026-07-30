import { useMutation } from "@tanstack/react-query";
import { createProductReview } from "../../api/products";

interface CreateReviewParams {
  id: string;
  review: {
    rating: number;
    comment: string;
  };
}

export const useCreateNewReview = () => {
  const mutation = useMutation({
    mutationFn: ({ id, review }: CreateReviewParams) => createProductReview(id, review),
  });

  return {
    createReview: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
