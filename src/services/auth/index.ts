"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/lib/Axios";

export const registerUser = async (userData: FormData) => {
  try {
    const data = await axiosInstance.post("/auth/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data?.data?.success) {
      cookies().set("token", data?.data?.token);
    }

    return data?.data;
  } catch (error: any) {

    return { error: error?.response?.data };
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data?.success) {
      cookies().set("token", data?.data?.token);
    }

    return data;
  } catch (error: any) {
    return { error: error?.response?.data };
  }
};

export const refetchToken = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/refetch-token");

    if (data?.success) {
      cookies().set("token", data?.data);
    }

    return data;
  } catch (error: any) {
    return { error: error?.response?.data };
  }
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
      isVerified: decodedData?.isVerified,
    };
  }

  return decodedData;
};
