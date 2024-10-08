"use server";

import axiosInstance from "@/lib/Axios";
import { TQueryParams } from "@/types/global.types";

export const fetchAllPosts = async (query: TQueryParams) => {
  const params = new URLSearchParams();

  if (query) {
    query.map((param) => params.append(param.name, param.value));
  }

  const { data } = await axiosInstance.get("/posts", { params });

  return data?.data;
};

export const fetchSinglePost = async (id: string) => {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data?.data;
};

export const fetchStates = async () => {
  const { data } = await axiosInstance.get("/posts/states/all");

  return data?.data;
};

export const createPost = async (postData: FormData) => {
  const { data } = await axiosInstance.post("/posts", postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data?.data;
};

export const createUpvote = async (voteData: { user: string; id: string }) => {
  const { data } = await axiosInstance.put(`/posts/${voteData?.id}/upvote`, {
    user: voteData?.user,
  });


  return data?.data;
};

export const createDownVote = async (voteData: { user: string; id: string }) => {
  const { data } = await axiosInstance.put(`/posts/${voteData?.id}/downvote`, {
    user: voteData?.user,
  });

  return data?.data;
};

export const updatePost = async ({ formData, id }: { formData: FormData; id: string }) => {
  const { data } = await axiosInstance.put(`/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data?.data;
};

export const deletePost = async (id: string) => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);

  return data?.data;
};
