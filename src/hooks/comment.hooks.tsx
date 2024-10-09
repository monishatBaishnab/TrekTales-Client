import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

import {
  createComment,
  createReply,
  deleteComment,
  fetchAllComments,
  fetchCommentsByPost,
  updateComment,
  updateReply,
} from "@/services/comment";
import { TQueryParams } from "@/types/global.types";
import { TComment } from "@/types/comment.types";

export const useFetchAllComments = (query: TQueryParams, page?: number, enabled = true) => {
  return useQuery({
    queryKey: ["allComments", page],
    queryFn: () => fetchAllComments(query),
    enabled,
    refetchOnWindowFocus: false,
  });
};

export const useFetchCommentsByPost = (postId: string) => {
  return useQuery({
    queryKey: ["commentsByPost", postId],
    queryFn: () => fetchCommentsByPost(postId),
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: (commentData: TComment) => createComment(commentData),
    onSuccess: () => {
      toast.success("Comment Posted");
      queryClient.invalidateQueries(["commentsByPost"]);
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateComment"],
    mutationFn: ({ id, commentData }: { id: string; commentData: Partial<TComment> }) =>
      updateComment(id, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsByPost"]);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsByPost"]);
    },
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createReply"],
    mutationFn: ({
      id,
      commentData,
    }: {
      id: string;
      commentData: { content: string; author: string };
    }) => createReply(id, commentData),
    onSuccess: () => {
      toast.success("Reply Posted");
      queryClient.invalidateQueries(["commentsByPost"]);
    },
  });
};
export const useUpdateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateReply"],
    mutationFn: ({
      id,
      replyId,
      commentData,
    }: {
      id: string;
      replyId: string;
      commentData: Partial<TComment>;
    }) => updateReply(id, replyId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries(["commentsByPost"]);
      toast.success("Comment Deleted.");
    },
  });
};
