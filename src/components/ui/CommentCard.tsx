import { EllipsisVertical, LoaderCircle, Pencil, Reply, Trash2, X } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { toast } from "sonner";

import TForm from "../form/TForm";
import TTextarea from "../form/TTextarea";

import TButton from "./TButton";

import { TComment, TReply } from "@/types/comment.types";
import { TUser } from "@/types/user.types";
import { useUserInfo } from "@/context/UserInfoProvider";
import {
  useCreateReply,
  useDeleteComment,
  useUpdateComment,
  useUpdateReply,
} from "@/hooks/comment.hooks";

const CommentCard = ({
  comment,
  commentId,
}: {
  comment: TComment | TReply;
  commentId?: string;
}) => {
  const [partialAction, setPartialAction] = useState<"reply" | "update" | undefined>(undefined);
  const { userInfo } = useUserInfo();
  const { mutate: updateComment, isLoading: updatingComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateReply } = useUpdateReply();
  const { mutate: createReply, isLoading: replyCreating } = useCreateReply();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!userInfo?._id) {
      toast.error("Pleas login/register for comment.");

      return;
    }

    const commentData = {
      content: data?.content,
    };

    if (partialAction === "reply") {
      createReply({
        id: commentId ? commentId : comment?._id as string,
        commentData: { content: data?.content, author: userInfo?._id },
      });

      return;
    } else if (partialAction === "update") {
      if (!commentId) {
        updateComment({
          id: comment?._id as string,
          commentData: commentData,
        });

        return;
      } else {
        updateReply({
          id: commentId,
          replyId: comment?._id as string,
          commentData: { content: data?.content },
        });
      }
      updateComment({
        id: comment?._id as string,
        commentData: commentData,
      });

      return;
    }
  };
  const date = moment(comment?.createdAt);
  const formattedDate = date.format("DD MMMM YYYY");

  const handleDelete = () => {
    if (!commentId) {
      deleteComment(comment?._id as string);

      return;
    } else {
      updateReply({
        id: commentId,
        replyId: comment?._id as string,
        commentData: { isDeleted: true },
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="title-3">{(comment?.author as TUser)?.name}</h3>
          <p className="paragraph">{formattedDate}</p>
        </div>
        {(comment?.author as TUser)?._id === userInfo?._id && (
          <div className="flex items-center gap-1">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex w-full items-center justify-end pr-1 outline-none ring-0">
                  <EllipsisVertical className="size-4" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="edit"
                  startContent={<Pencil className="size-4" />}
                  onPress={() => setPartialAction("update")}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  startContent={<Trash2 className="size-4" />}
                  onPress={handleDelete}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </div>
      <p className="paragraph !italic">{comment?.content}</p>
      <div className="flex items-center gap-2">
        <TButton
          className="!h-7"
          color="gray"
          radius="full"
          size="sm"
          startContent={<Reply className="size-4" />}
          onPress={() => setPartialAction("reply")}
        >
          Reply
        </TButton>
      </div>
      {partialAction && (
        <TForm
          defaultValues={{ content: partialAction === "reply" ? "" : comment?.content }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-3">
            <TTextarea
              endContent={
                <button onClick={() => setPartialAction(undefined)}>
                  <X className="size-4 text-shark-700" />
                </button>
              }
              name="content"
              placeholder="Write your comment hare"
            />
            <TButton size="sm" type="submit">
              {replyCreating || updatingComment ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                `Post ${partialAction ? partialAction : ""}`
              )}
            </TButton>
          </div>
        </TForm>
      )}
    </div>
  );
};

export default CommentCard;
