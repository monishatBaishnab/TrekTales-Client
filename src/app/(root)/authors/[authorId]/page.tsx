"use client";

import { LoaderCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { ReactNode } from "react";

import TButton from "@/components/ui/TButton";
import { useFetchSingleAuthor, useFollowAuthors } from "@/hooks/user.hooks";
import PostCard from "@/components/ui/PostCard";
import PostCardSkeleton from "@/components/ui/PostCardSkeleton";
import SectionTitle from "@/components/ui/SectionTitle";
import { TPost } from "@/types/post.types";
import UserProfileSkeleton from "@/components/ui/UserProfileSkeleton";
import UserProfileView from "@/components/modules/user/UserProfileView";
import { useUserInfo } from "@/context/UserInfoProvider";
import TEmpty from "@/components/ui/TEmpty";

const AuthorDetails = ({ params }: { params: { authorId: string } }) => {
  const { data, isLoading, isFetching } = useFetchSingleAuthor(params?.authorId as string);
  const { mutate: followAuthor, isLoading: following } = useFollowAuthors();

  const { userInfo } = useUserInfo();
  const isFollowing = data?.author?.followers?.includes(userInfo?._id);
  let followButtonText: ReactNode | string = "Follow";

  if (following) {
    followButtonText = <LoaderCircle className="size-4 animate-spin" />;
  }

  if (isFollowing) {
    followButtonText = "Following";
  }

  const handleFollow = () => {
    if (!userInfo?._id) {
      toast.error("Pleas login/register for follow authors.");

      return;
    }
    followAuthor({ author: params?.authorId });
  };

  return (
    <section>
      <div className="container">
        {isLoading || isFetching ? (
          <UserProfileSkeleton />
        ) : (
          <UserProfileView
            action={
              <TButton
                className="!gap-1 !text-sm !text-shark-600"
                color="gray"
                isDisabled={isFollowing}
                size="sm"
                startContent={<Plus className="size-4" />}
                onPress={handleFollow}
              >
                {followButtonText}
              </TButton>
            }
            user={data?.author ?? {}}
          />
        )}
        <div>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-3">
                <SectionTitle bgText="Author" planeText="Posts" />
              </div>
              {isLoading || isFetching ? (
                Array.from({ length: 6 }).map((_, id) => (
                  <PostCardSkeleton
                    key={id}
                    classNames={{
                      base: "!flex-col !p-0",
                      image: { wrapper: "!h-[250px] !w-full" },
                    }}
                  />
                ))
              ) : data?.posts?.length ? (
                data?.posts?.map((post: TPost) => (
                  <PostCard
                    key={post?._id}
                    classNames={{
                      base: "!flex-col !p-0",
                      image: { wrapper: "!h-[250px] !w-full" },
                    }}
                    post={post}
                  />
                ))
              ) : (
                <div className="sm:col-span-2 lg:col-span-3">
                  <TEmpty />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorDetails;
