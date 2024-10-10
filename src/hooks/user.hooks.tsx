import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

import {
  fetchAllAuthors,
  fetchAllUsers,
  fetchPaymentsStates,
  fetchPopularAuthors,
  fetchSingleAuthor,
  fetchSingleUser,
  followAuthor,
  updateProfile,
  verifyProfile,
} from "@/services/user";
import { TQueryParams } from "@/types/global.types";

export const useFetchAllUsers = (query: TQueryParams, page?: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => {
      return fetchAllUsers(query);
    },
    refetchOnWindowFocus: false,
  });
};
export const useFetchAllAuthors = (query: TQueryParams, key: string, page?: number) => {
  return useQuery({
    queryKey: [key, page],
    queryFn: () => {
      return fetchAllAuthors(query);
    },
    refetchOnWindowFocus: false,
  });
};

export const useFetchPopularAuthors = () => {
  return useQuery({
    queryKey: ["popularAuthors"],
    queryFn: () => {
      return fetchPopularAuthors();
    },
    refetchOnWindowFocus: false,
  });
};

export const useFetchSingleAuthor = (id: string) => {
  return useQuery({
    queryKey: ["singleAuthor", id],
    queryFn: async () => await fetchSingleAuthor(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useFetchSingleUser = (id: string) => {
  return useQuery({
    queryKey: ["singleUser", id],
    queryFn: async () => await fetchSingleUser(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
export const useFetchPaymentStates = () => {
  return useQuery({
    queryKey: ["paymentStates"],
    queryFn: async () => await fetchPaymentsStates(),
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: ({ id, userData }: { id: string; userData: FormData }) =>
      updateProfile(id, userData),
    onSuccess: (data) => {
      toast.success("Profile Updated.");
      queryClient.invalidateQueries(["singleUser", data?._id]);
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useFollowAuthors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["followAuthor"],
    mutationFn: (payload: { author: string }) => followAuthor(payload),
    onSuccess: () => {
      toast.success("Follow successfully.");
      queryClient.invalidateQueries(["singleAuthor"]);
    },
  });
};

export const useVerifyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["verifyProfile"],
    mutationFn: (payload: { user: string }) => verifyProfile(payload),
    onSuccess: (data) => {
      toast.success("Profile Verified Successfully.");
      queryClient.invalidateQueries(["singleUser"]);
      window.location.href = data?.payment_url;
    },
  });
};
