import { FieldValues } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";

import { loginUser, refetchToken, registerUser } from "@/services/auth";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (userData: FormData) => await registerUser(userData),
    onSuccess: (data) => {
      if (!data?.error) {
        toast.success("Registration Success.");
      } else {
        toast.error(data?.error?.message);
      }
    },
  });
};

const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (userData: FieldValues) => loginUser(userData),
    onSuccess: (data) => {
      if (!data?.error) {
        toast.success("Login Success.");
      } else {
        toast.error(data?.error?.error);
      }
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
