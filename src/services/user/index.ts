"use server";

import axiosInstance from "@/lib/Axios";
import { TQueryParams } from "@/types/global.types";

export const fetchAllUsers = async (query: TQueryParams) => {
  const params = new URLSearchParams();

  if (query) {
    query?.map((param) => params.append(param.name, param.value));
  }

  const { data } = await axiosInstance.get("/users", { params });

  return data?.data;
};
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

  return data?.data;
};

export const updateProfile = async (id: string, postData: FormData) => {
  const { data } = await axiosInstance.put(`/users/${id}`, postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data?.data;
};

export const fetchPopularAuthors = async () => {
  const { data } = await axiosInstance.get(`/users/popular-authors`);

  return data?.data;
};

export const fetchSingleAuthor = async (id: string) => {
  const { data } = await axiosInstance.get(`/users/authors/${id}`);

  return data?.data;
};

export const followAuthor = async (payload: { author: string }) => {
  const { data } = await axiosInstance.post(`/users/follow`, payload);

  return data?.data;
};

export const verifyProfile = async (payload: { user: string }) => {
  const { data } = await axiosInstance.post(`/payments/create-payment`, payload);

  return data?.data;
};
