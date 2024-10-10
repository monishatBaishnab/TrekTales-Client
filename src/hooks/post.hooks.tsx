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
  fetchUpvotes,
  updatePost,
} from "@/services/post";
import { TQueryParams } from "@/types/global.types";

const useFetchAllPosts = (
  params: TQueryParams | null,
  key: string,
  page?: number | string,
  enabled = true
) => {
  return useQuery({
    queryKey: ['posts', key, page],
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
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      toast.success("New Post Created.");
      queryClient.invalidateQueries(["myPosts"]);
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
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      toast.success("Post Deleted.");
      queryClient.invalidateQueries(['posts']);
    },
  });
};

export const useFetchUpvotes = (authorId: string) => {
  return useQuery({
    queryKey: ["upvotes"],
    queryFn: () => fetchUpvotes(authorId),
    enabled: !!authorId,
  });
};

export default useFetchAllPosts;
