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
