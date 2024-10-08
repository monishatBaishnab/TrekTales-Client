import { Input, Textarea } from "@nextui-org/input";
import { CircleArrowRight, LoaderCircle, Mail, ThumbsDown, ThumbsUp, User } from "lucide-react";
import { toast } from "sonner";

import CommentCard from "@/components/ui/CommentCard";
import TButton from "@/components/ui/TButton";
import { useUserInfo } from "@/context/UserInfoProvider";
import { useCerateUpVote, useCreateDownVote } from "@/hooks/post.hooks";
import { TPost } from "@/types/post.types";

const Comments = ({ postDetails }: { postDetails: TPost }) => {
  const { userInfo } = useUserInfo();
  const { mutate: createUpvote, isLoading: upVoting } = useCerateUpVote();
  const { mutate: createDownVote, isLoading: downVoting } = useCreateDownVote();
  const findUserVote = postDetails?.votes?.find((vote) => vote.user === userInfo?._id);

  console.log(findUserVote);
  const handleVote = (vote: string) => {
    if (!userInfo?._id) {
      toast.error("Please login/register for create vote.");

      return;
    }

    if (vote === "up") {
      createUpvote({ user: userInfo?._id, id: postDetails?._id as string });

      return;
    }
    if (vote === "down") {
      createDownVote({ user: userInfo?._id, id: postDetails?._id as string });

      return;
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between ">
          <h1 className="title-1">3 Comments:</h1>
          <div className="flex items-center gap-2">
            <TButton
              isIconOnly
              color="persian-green-gost"
              isDisabled={findUserVote?.vote === "up"}
              onPress={() => handleVote("up")}
            >
              {upVoting ? <LoaderCircle className="animate-spin" /> : <ThumbsUp />}
            </TButton>
            <TButton
              isIconOnly
              color="persian-green-gost"
              isDisabled={findUserVote?.vote === "down"}
              onPress={() => handleVote("down")}
            >
              {downVoting ? <LoaderCircle className="animate-spin" /> : <ThumbsDown />}
            </TButton>
          </div>
        </div>
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
              startContent={<User className="size-4 text-shark-500" />}
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
              startContent={<Mail className="size-4 text-shark-500" />}
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
        <TButton endContent={<CircleArrowRight className="size-5" />}>Post Comment</TButton>
      </div>
    </div>
  );
};

export default Comments;
