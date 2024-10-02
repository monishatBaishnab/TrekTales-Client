import { FiUser } from "react-icons/fi";
import { Input, Textarea } from "@nextui-org/input";
import { MdOutlineMailOutline } from "react-icons/md";

import CommentCard from "@/components/ui/CommentCard";
import TButton from "@/components/ui/TButton";

const Comments = () => {
  return (
    <div>
      <div className="space-y-5">
        <h1 className="title-1">3 Comments:</h1>
        <div className="space-y-4">
          <div className="space-y-5 rounded-md border border-shark-100 p-4">
            <CommentCard />
            <div className="ml-5 rounded-md bg-shark-50 p-4">
              <CommentCard />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <h2 className="title-2">Leave a Comment:</h2>
          <p className="paragraph">
            Your email address will not be published. Required fields are marked*
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Input
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Write Your Name"
              radius="sm"
              size="lg"
              startContent={<FiUser className="text-xl text-shark-500" />}
            />
          </div>
          <div>
            <Input
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Write Your Email"
              radius="sm"
              size="lg"
              startContent={<MdOutlineMailOutline className="text-xl text-shark-500" />}
            />
          </div>
        </div>
        <div>
          <div>
            <Textarea
              label="Comment"
              labelPlacement="outside"
              name="content"
              placeholder="Write your comment hare."
              radius="sm"
              size="lg"
            />
          </div>
        </div>
        <TButton>Post Comment</TButton>
      </div>
    </div>
  );
};

export default Comments;
