"use client";
import PostCard from "@/components/ui/PostCard";
import PostCardSkeleton from "@/components/ui/PostCardSkeleton";
import SectionTitle from "@/components/ui/SectionTitle";
import useFetchAllPosts from "@/hooks/post.hooks";
import { TPost } from "@/types/post.types";
interface PostSectionProps {
  title: string;
  isLoading: boolean;
  posts: TPost[] | undefined;
  skeletonCount: number;
  isAction?: boolean;
  isDate?: boolean;
  isDescription?: boolean;
  isImage?: boolean;
}
const PostSection = ({
  title,
  isLoading,
  posts,
  skeletonCount,
  isAction,
  isDate,
  isDescription,
  isImage,
}: PostSectionProps) => (
  <div className="space-y-10">
    <SectionTitle bgText={title} planeText="This Month" />
    <div className="max-h-[400px] space-y-5 overflow-x-hidden overscroll-y-auto pr-3">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, id) => (
            <PostCardSkeleton
              key={id}
              classNames={{
                title: "!title-5",
                contentWrapper: "!mb-0 mt-2",
                base: "!bg-transparent !p-3 border border-persian-green-600/200",
              }}
              isAction={isAction}
              isDate={isDate}
              isDescription={isDescription}
              isImage={isImage}
            />
          ))
        : posts?.map((post: TPost) => (
            <PostCard
              key={post?._id}
              classNames={{
                title: "!title-5",
                contentWrapper: "!mb-0 mt-2",
                base: "!bg-transparent !p-3 border border-persian-green-600/200",
              }}
              isAction={isAction}
              isDate={isDate}
              isDescription={isDescription}
              isImage={isImage}
              post={post}
            />
          ))}
    </div>
  </div>
);

const Header = () => {
  const { data: featurePosts, isLoading: featureLoading } = useFetchAllPosts(
    [{ name: "isFeatured", value: "true" }],
    "featuredPosts"
  );
  const { data: popularPosts, isLoading: popularLoading } = useFetchAllPosts(
    [
      { name: "limit", value: "3" },
      { name: "page", value: "1" },
      { name: "sort", value: "-updatedAt" },
    ],
    "popularPosts"
  );

  return (
    <section className="bg-persian-green-600/5">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 md:col-span-2">
            <PostSection
              isAction
              isDate
              isDescription
              isImage
              isLoading={featureLoading}
              posts={featurePosts?.data}
              skeletonCount={3}
              title="Featured"
            />
          </div>
          <PostSection
            isAction={false}
            isDate={false}
            isDescription={false}
            isImage={false}
            isLoading={popularLoading}
            posts={popularPosts?.data}
            skeletonCount={3}
            title="Popular"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
