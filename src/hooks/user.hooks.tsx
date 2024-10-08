import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

import {
  fetchAllAuthors,
  fetchPopularAuthors,
  fetchSingleAuthor,
  fetchSingleUser,
  updateProfile,
} from "@/services/user";
import { TQueryParams } from "@/types/global.types";

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
    queryKey: ["author", id],
    queryFn: async () => await fetchSingleAuthor(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useFetchSingleUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => await fetchSingleUser(id),
    enabled: !!id,
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
      queryClient.invalidateQueries(["user", data?._id]);
    },
  });
};
