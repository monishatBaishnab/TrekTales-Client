import { FieldValues } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

import { loginUser, refetchToken, registerUser } from "@/services/auth";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (userData: FormData) => registerUser(userData),
    onSuccess: () => {
      toast.success("Registration Success.");
    },
  });
};

const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (userData: FieldValues) => loginUser(userData),
    onSuccess: () => {
      toast.success("Login Success.");
    },
  });
};

export const useRefetchToken = () => {
  return useMutation({
    mutationKey: ["refetchToken"],
    mutationFn: () => refetchToken(),
  });
};

export default useLoginUser;
