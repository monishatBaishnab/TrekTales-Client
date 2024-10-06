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

export const createPost = async (postData: FormData) => {
  const { data } = await axiosInstance.post("/posts", postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data?.data;
};
