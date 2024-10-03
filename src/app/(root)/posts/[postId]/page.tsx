import { Calendar, MessageCircleMore } from "lucide-react";

import Comments from "./_components/Comments";

import Sidebar from "@/components/modules/sidebar/Sidebar";
const PostDetails = () => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-10 sm:col-span-2">
            <div className="space-y-4">
              <span className="tag-light">Travel</span>
              <h1 className="title-1">
                I Created a Developer Rap Video - Here&apos;s What I Learned
              </h1>
              <div className="flex flex-wrap items-center gap-2">
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
                  <Calendar className="size-4 text-shark-600" />
                  <span className="mt-0.5 text-xs text-shark-500">02 December 2022</span>
                </div>

                {/* Comments */}
                <div className={"flex items-center gap-1"}>
                  <MessageCircleMore className="size-4 text-shark-600" />
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
              <p className="paragraph">
                Did you come here for something in particular or just general Riker-bashing? And
                blowing into maximum warp speed, you appeared for an instant to be in two places at
                once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna
                talk about the assassination attempt on Lieutenant Worf. Could someone survive
                inside a transporter buffer for 75 years? Fate. It protects fools, little children,
                and ships.
              </p>
            </div>

            <Comments />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
