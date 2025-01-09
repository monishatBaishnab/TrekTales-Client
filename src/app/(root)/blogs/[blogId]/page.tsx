"use client";

import { Calendar, ShieldCheck, ShieldOff } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Comments from "./_components/Comments";
import DetailsSkeleton from "./_components/DetailsSkeleton";

import { useFetchSinglePost } from "@/hooks/post.hooks";
import Sidebar from "@/components/modules/sidebar/Sidebar";
import { useUserInfo } from "@/context/UserInfoProvider";
const PostDetails = ({ params }: { params: { blogId: string } }) => {
  const { data: postDetails, isLoading, isFetching, isError } = useFetchSinglePost(params?.blogId);
  const { userInfo } = useUserInfo();
  const date = moment(postDetails?.createdAt);
  const formattedDate = date.format("DD MMMM YYYY");
  const router = useRouter();

  // Handle premium content access
  if (postDetails?.isPremium && !userInfo?.isVerified) {
    toast.error("You have no access to premium contents");
    router.push("/login");

    return null;
  }

  // Handle fetching errors
  if (isError) {
    toast.error("An error occurred while fetching the post.");
    router.push("/login");

    return null;
  }

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-10 sm:col-span-2">
            {isLoading || isFetching ? (
              <DetailsSkeleton />
            ) : (
              <div className="space-y-4">
                <span className="tag-light">{postDetails?.category}</span>
                <h1 className="title-1">{postDetails?.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Author */}

                  <div className={"flex items-center gap-1"}>
                    <div className="size-[18px] overflow-hidden rounded-full">
                      <img
                        alt={postDetails?.author?.name}
                        className="size-full object-cover"
                        src={postDetails?.author?.profilePicture}
                      />
                    </div>
                    <span className="mt-0.5 text-xs text-shark-500">
                      {postDetails?.author?.name}
                    </span>
                  </div>

                  {/* Date */}
                  <div className={"flex items-center gap-1"}>
                    <Calendar className="size-4 text-shark-600" />
                    <span className="mt-0.5 text-xs text-shark-500">{formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {postDetails?.isPremium ? (
                      <ShieldCheck className="size-4 text-persian-green-600" />
                    ) : (
                      <ShieldOff className="size-4 text-shark-600" />
                    )}
                    <span className="mt-0.5 text-xs text-shark-500">
                      {postDetails?.isPremium ? (
                        <span className="text-persian-green-600">Premium</span>
                      ) : (
                        "Free"
                      )}
                    </span>
                  </div>
                </div>
                <div className="h-[350px] w-full overflow-hidden rounded-md">
                  <img
                    alt={postDetails?.title}
                    className={"size-full object-cover"}
                    src={postDetails?.image}
                  />
                </div>
                <div className="tiptap" dangerouslySetInnerHTML={{ __html: postDetails?.content }} />
              </div>
            )}

            <Comments postDetails={postDetails} />
          </div>
          <div className="hidden md:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
