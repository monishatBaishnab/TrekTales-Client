import { CircleArrowRight, LoaderCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

import CommentCard from "@/components/ui/CommentCard";
import TButton from "@/components/ui/TButton";
import { useUserInfo } from "@/context/UserInfoProvider";
import { useCerateUpVote, useCreateDownVote } from "@/hooks/post.hooks";
import { TPost } from "@/types/post.types";
import TForm from "@/components/form/TForm";
import TTextarea from "@/components/form/TTextarea";
import { useCreateComment, useFetchCommentsByPost } from "@/hooks/comment.hooks";
import { TComment, TReply } from "@/types/comment.types";
import CommentCardSkeleton from "@/components/ui/CommentCardSkeleton";
import TEmpty from "@/components/ui/TEmpty";

const Comments = ({ postDetails }: { postDetails: TPost }) => {
  const { userInfo } = useUserInfo() ?? {};
  const { mutate: createUpvote, isLoading: upVoting } = useCerateUpVote();
  const { mutate: createDownVote, isLoading: downVoting } = useCreateDownVote();
  const findUserVote = postDetails?.votes?.find((vote) => vote.user === userInfo?._id);
  const { mutate: createComment, isLoading: creatingComment } = useCreateComment();

  const {
    data: comments,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
  } = useFetchCommentsByPost(postDetails?._id as string);
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

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!userInfo?._id) {
      toast.error("Pleas login/register for comment.");

      return;
    }

    const commentData = {
      author: userInfo?._id,
      post: postDetails?._id,
      content: data?.content,
    };

    createComment(commentData as TComment);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between ">
          <h1 className="title-1">Comments</h1>
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
            {commentsLoading || commentsFetching || !postDetails?._id ? (
              Array?.from({ length: 3 }).map((_, id) => <CommentCardSkeleton key={id} />)
            ) : !comments?.length ? (
              <TEmpty />
            ) : (
              comments?.map((comment: TComment) => (
                <div key={comment?._id}>
                  <CommentCard comment={comment} />
                  {comment?.replies?.length ? (
                    <div className="ml-5 mt-5 space-y-3 rounded-md bg-shark-50/50 p-4">
                      {comment?.replies?.map((reply: TReply) => (
                        <CommentCard key={reply?._id} comment={reply} commentId={comment?._id} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ))
            )}
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
        <TForm onSubmit={handleSubmit}>
          <div className="space-y-5">
            <TTextarea label="Comment" name="content" placeholder="Write your comment hare." />

            <TButton endContent={<CircleArrowRight className="size-5" />} type="submit">
              {creatingComment ? <LoaderCircle className="animate-spin" /> : "Post Comment"}
            </TButton>
          </div>
        </TForm>
      </div>
    </div>
  );
};

export default Comments;
