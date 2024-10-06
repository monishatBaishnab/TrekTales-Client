import { useQuery } from "react-query";

import { fetchAllPosts } from "@/services/post";
import { TQueryParams } from "@/types/global.types";

const useFetchAllPosts = (params: TQueryParams, key: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => {
      return fetchAllPosts(params);
    },
  });
};

export default useFetchAllPosts;
