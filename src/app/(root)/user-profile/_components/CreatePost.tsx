import { Plus, X, Save, LoaderCircle } from "lucide-react";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

import TTextEditor from "@/components/form/TextEditor/TTextEditor";
import TFile from "@/components/form/TFile";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import TSelect from "@/components/form/TSelect";
import TButton from "@/components/ui/TButton";
import TModal from "@/components/ui/TModal";
import { postCategoryOptions, postsTagsOptions } from "@/constants/pots.constants";
import { useCreatePost, useUpdatePost } from "@/hooks/post.hooks";
import { TPost } from "@/types/post.types";
import TTextarea from "@/components/form/TTextarea";
import { useUserInfo } from "@/context/UserInfoProvider";
import TCheckbox from "@/components/form/TCheckbox";
import { arrConverter } from "@/utils/arrConverter";
type TCreatePostsProps = {
  onOpen: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  selectedPost: TPost;
  action: string;
  setAction: Dispatch<SetStateAction<string>>;
  setSelectedPost: Dispatch<SetStateAction<TPost | undefined>>;
};

const CreatePost = ({
  onOpen,
  isOpen,
  onClose,
  onOpenChange,
  selectedPost,
  action,
  setAction,
  setSelectedPost,
}: TCreatePostsProps) => {
  const { mutate, isLoading, isSuccess, data } = useCreatePost();
  const { mutate: updatePost, isLoading: updatingPost, isSuccess: postUpdated } = useUpdatePost();
  const { userInfo } = useUserInfo();

  let defaultValues: Partial<TPost> = {};

  if (selectedPost) {
    defaultValues = {
      title: selectedPost.title,
      shortDescription: selectedPost?.shortDescription,
      content: selectedPost?.content,
      tags: selectedPost?.tags,
      category: selectedPost?.category,
    };
  }

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const tags = arrConverter(data?.tags);
    const category = arrConverter(data?.category)?.[0];
    const postData: Partial<TPost> = { ...data, tags, category, author: userInfo?._id };

    delete postData?.image;

    const formData = new FormData();

    formData.append("data", JSON.stringify(postData));

    if (data?.image) {
      formData.append("image", data?.image);
    }

    if (action === "create") {
      mutate(formData);
    } else {
      updatePost({ formData, id: selectedPost?._id as string });
    }
  };

  useEffect(() => {
    if (
      (isSuccess && !isLoading && !data?.error) ||
      (!updatingPost && postUpdated && !data?.error)
    ) {
      onClose();
    }
  }, [isSuccess, postUpdated]);

  return (
    <div>
      <TButton
        color="persian-green-gost"
        endContent={<Plus className="size-5" />}
        size="sm"
        onPress={() => {
          onOpen(), setAction("create"), setSelectedPost(undefined);
        }}
      >
        Create Post
      </TButton>
      <TModal
        isOpen={isOpen}
        title={{ bgText: `${action === "create" ? "Create" : "Update"}`, planeText: "Post" }}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <TForm defaultValues={defaultValues} onSubmit={handleSubmit}>
          <div className="space-y-5 py-5">
            <div className="flex items-center gap-5">
              <TInput label="Post Title" name="title" placeholder="Title" />
              <TSelect
                label="Post Category"
                name="category"
                options={postCategoryOptions}
                placeholder="Category"
              />
            </div>

            <div className="flex">
              <TSelect
                label="Post Tags"
                name="tags"
                options={postsTagsOptions}
                placeholder="Tags"
                selectionMode="multiple"
              />
            </div>

            <TTextarea
              label="Short Description"
              name="shortDescription"
              placeholder="Write a short description of your post."
            />
            <TTextEditor name="content" />
            <TFile label="Post Thumb" name="image" />
            <TCheckbox
              isDisabled={!userInfo?.isVerified}
              label="Mark as premium"
              name="isPremium"
            />
            <div className="flex items-center justify-end gap-2">
              <TButton
                color="gray"
                endContent={<X className="size-5" />}
                size="lg"
                onPress={onClose}
              >
                Cancel
              </TButton>
              <TButton endContent={<Save className="size-5" />} size="lg" type="submit">
                {isLoading || updatingPost ? <LoaderCircle className="animate-spin" /> : "Save"}
              </TButton>
            </div>
          </div>
        </TForm>
      </TModal>
    </div>
  );
};

export default CreatePost;
