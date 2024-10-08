/* eslint-disable no-console */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

import {
  createDownVote,
  createPost,
  createUpvote,
  deletePost,
  fetchAllPosts,
  fetchSinglePost,
  fetchStates,
  updatePost,
} from "@/services/post";
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

export const useFetchSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["postDetails"],
    queryFn: () => {
      return fetchSinglePost(id as string);
    },
    refetchOnWindowFocus: false,
  });
};

export const useFetchStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => fetchStates(),
    onError: (err) => {
      console.log(err);
    },
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
export const useCerateUpVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["upvote"],
    mutationFn: (voteData: { user: string; id: string }) => createUpvote(voteData),
    onSuccess: () => {
      toast.success("Upvoted Success.");
      queryClient.invalidateQueries(["postDetails"]);
    },
  });
};
export const useCreateDownVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["downvote"],
    mutationFn: (voteData: { user: string; id: string }) => createDownVote(voteData),
    onSuccess: () => {
      toast.success("Downvoted Success.");
      queryClient.invalidateQueries(["postDetails"]);
    },
  });
};

export const useUpdatePost = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: (props: { formData: FormData; id: string }) => updatePost(props),
    onSuccess: () => {
      toast.success("Post Updated.");
      queryCLient.invalidateQueries(["myPosts"]);
    },
    onError: (error) => console.log(error, "from muation"),
  });
};
export const useDeletePost = () => {
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      toast.success("Post Deleted.");
    },
  });
};

export default useFetchAllPosts;
