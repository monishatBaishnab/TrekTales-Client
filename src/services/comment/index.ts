"use server";

import axiosInstance from "@/lib/Axios";
import { TComment } from "@/types/comment.types";
import { TQueryParams } from "@/types/global.types";

export const fetchAllComments = async (query: TQueryParams) => {
  const params = new URLSearchParams();

  if (query) {
    query.map((param) => params.append(param.name, param.value));
  }
  const { data } = await axiosInstance.get("/comments", { params });

  return data?.data;
};

export const fetchCommentsByPost = async (postId: string) => {
  const { data } = await axiosInstance.get(`/comments/posts/${postId}`);

  return data?.data;
};

export const createComment = async (commentData: TComment) => {
  const { data } = await axiosInstance.post(`/comments`, commentData);

  return data?.data;
};

export const updateComment = async (id: string, commentData: Partial<TComment>) => {
  const { data } = await axiosInstance.put(`/comments/${id}`, commentData);

  return data?.data;
};

export const deleteComment = async (id: string) => {
  const { data } = await axiosInstance.delete(`/comments/${id}`);

  return data?.data;
};

export const createReply = async (id: string, replyData: Partial<TComment>) => {
  const { data } = await axiosInstance.post(`/comments/${id}/replies`, replyData);

  return data?.data;
};

export const updateReply = async (id: string, replyId: string, replyData: Partial<TComment>) => {
  const { data } = await axiosInstance.put(`/comments/${id}/replies/${replyId}`, replyData);

  return data?.data;
};
