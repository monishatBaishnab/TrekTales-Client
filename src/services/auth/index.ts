"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/lib/Axios";

export const registerUser = async (userData: FormData) => {
  const { data } = await axiosInstance.post("/auth/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (data?.success) {
    cookies().set("token", data?.data?.token);
  }

  return data;
};

export const loginUser = async (userData: FieldValues) => {
  const { data } = await axiosInstance.post("/auth/login", userData);

  if (data?.success) {
    cookies().set("token", data?.data?.token);
  }

  return data;
};

export const logoutUser = () => {
  cookies().delete("token");
};

export const getCurrentUser = async () => {
  const userToken = cookies().get("token")?.value;
  let decodedData = null;

  if (userToken) {
    decodedData = await jwtDecode(userToken as string);

    return {
      _id: decodedData?._id,
      role: decodedData?.role,
      email: decodedData?.email,
    };
  }

  return decodedData;
};
