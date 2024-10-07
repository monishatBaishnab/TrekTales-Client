import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

import { createPost, fetchAllPosts } from "@/services/post";
import { TQueryParams } from "@/types/global.types";

const useFetchAllPosts = (
  params: TQueryParams,
  key: string,
  page?: number | string,
  enabled = true
) => {
  return useQuery({
    queryKey: [key, page],
    queryFn: () => {
      return fetchAllPosts(params);
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      toast.success("New Post Created.");
    },
  });
};

export default useFetchAllPosts;
