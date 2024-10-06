"use server";

import axiosInstance from "@/lib/Axios";
import { TQueryParams } from "@/types/global.types";

export const fetchAllAuthors = async (query: TQueryParams) => {
  const params = new URLSearchParams();

  if (query) {
    query?.map((param) => params.append(param.name, param.value));
  }

  const { data } = await axiosInstance.get("/users/authors", { params });

  return data?.data;
};

export const fetchSingleUser = async (id: string) => {
  const { data } = await axiosInstance.get(`/users/${id}`);

  console.log(id);

  return data?.data;
};

export const updateProfile = async (id: string, postData: FormData) => {
  const { data } = await axiosInstance.put(`/users/${id}`, postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data?.data;
};
