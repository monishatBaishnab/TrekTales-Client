import { FaRegCalendarAlt, FaRegCommentDots } from "react-icons/fa";

import PostCard from "@/components/ui/PostCard";

const PostDetails = ({ params }: { params: { postId: string } }) => {
  console.log(params);

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="sm:col-span-2">
            <span className="tag-light">Travel</span>
            <h1 className="title-1">
              I Created a Developer Rap Video - Here&apos;s What I Learned
            </h1>
            <div className={"my-4 flex flex-wrap items-center gap-2"}>
              {/* Author */}

              <div className={"flex items-center gap-1"}>
                <div className="size-[18px] overflow-hidden rounded-full">
                  <img
                    alt="User"
                    className="size-full object-cover"
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </div>
                <span className="mt-0.5 text-xs text-shark-500">Jesica koli</span>
              </div>

              {/* Date */}
              <div className={"flex items-center gap-1"}>
                <FaRegCalendarAlt className="text-sm text-shark-600" />
                <span className="mt-0.5 text-xs text-shark-500">02 December 2022</span>
              </div>

              {/* Comments */}
              <div className={"flex items-center gap-1"}>
                <FaRegCommentDots className="text-sm text-shark-600" />
                <span className="mt-0.5 text-xs text-shark-500">12 Comments</span>
              </div>
            </div>
            <div className="h-[350px] w-full overflow-hidden rounded-md">
              <img
                alt="Thumb"
                className={"size-full object-cover"}
                src="https://images.unsplash.com/photo-1668535453283-4655d213d561?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
            <p className="paragraph mt-8">
              Did you come here for something in particular or just general Riker-bashing? And
              blowing into maximum warp speed, you appeared for an instant to be in two places at
              once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna
              talk about the assassination attempt on Lieutenant Worf. Could someone survive inside
              a transporter buffer for 75 years? Fate. It protects fools, little children, and
              ships.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="col-span-2 mb-10 inline-flex items-center gap-1">
                <h3 className="title-3 bg-title">See Related</h3>
                <h3 className="title-3">Posts</h3>
              </div>
              {Array.from({ length: 2 }).map((_, id) => (
                <PostCard
                  key={id}
                  classNames={{
                    base: "!flex-col !p-0",
                    image: { wrapper: "!h-[250px] !w-full" },
                  }}
                />
              ))}
            </div>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
