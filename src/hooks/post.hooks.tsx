import { useQuery } from "react-query";

import { fetchAllPosts } from "@/services/post";
import { TQueryParams } from "@/types/global.types";

const useFetchAllPosts = (params: TQueryParams, key: string, page?: number) => {
  return useQuery({
    queryKey: [key, page],
    queryFn: () => {
      return fetchAllPosts(params);
    },
  });
};

export default useFetchAllPosts;
