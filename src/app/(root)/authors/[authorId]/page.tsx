import { Plus } from "lucide-react";

import PostContainer from "@/components/modules/posts/PostContainer";
import TButton from "@/components/ui/TButton";
import { authorImage } from "@/constants/global.constats";

const AuthorDetails = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center gap-7 rounded-lg border border-shark-200 p-10 sm:flex-row">
          <div className="size-28 shrink-0 overflow-hidden rounded-full">
            <img alt="Author" className="size-full object-cover" src={authorImage} />
          </div>
          <div className="w-full space-y-3">
            <div className="flex flex-wrap items-center justify-between border-b border-b-shark-200 pb-3">
              <h2 className="title-2">Alexandra H.</h2>
              <div className="flex items-center gap-2">
                <span className="flex h-[34px] items-center justify-center rounded-lg border border-shark-200 bg-white px-3 text-sm text-shark-600">
                  12 Post
                </span>
                <TButton
                  className="!gap-0.5 !text-sm !text-shark-600"
                  color="gray"
                  size="sm"
                  startContent={<Plus className="size-4" />}
                >
                  Follow
                </TButton>
              </div>
            </div>
            <p className="paragraph">
              Hi there! I&apos;m Jessica, the voice behind this blog. Traveling has always been my
              passion, and sharing my experiences through writing is something I truly enjoy. I
              believe in the power of storytelling to connect people and inspire them to explore the
              world.
            </p>
          </div>
        </div>
        <div>
          <PostContainer
            title={
              <div className="mb-5 inline-flex items-center gap-1">
                <h3 className="title-3 bg-title">Post of</h3>
                <h3 className="title-3">this Author</h3>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default AuthorDetails;
