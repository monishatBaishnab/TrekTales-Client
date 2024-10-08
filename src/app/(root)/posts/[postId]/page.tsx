"use client";

import { Calendar, MessageCircleMore } from "lucide-react";
import moment from "moment";

import Comments from "./_components/Comments";
import DetailsSkeleton from "./_components/DetailsSkeleton";

import { useFetchSinglePost } from "@/hooks/post.hooks";
import Sidebar from "@/components/modules/sidebar/Sidebar";
const PostDetails = ({ params }: { params: { postId: string } }) => {
  const { data: postDetails, isLoading, isFetching } = useFetchSinglePost(params?.postId);
  const date = moment(postDetails?.createdAt);
  const formattedDate = date.format("DD MMMM YYYY");

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

                  {/* Comments */}
                  <div className={"flex items-center gap-1"}>
                    <MessageCircleMore className="size-4 text-shark-600" />
                    <span className="mt-0.5 text-xs text-shark-500">12 Comments</span>
                  </div>
                </div>
                <div className="h-[350px] w-full overflow-hidden rounded-md">
                  <img
                    alt={postDetails?.title}
                    className={"size-full object-cover"}
                    src={postDetails?.image}
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: postDetails?.content }}
               
                />
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
