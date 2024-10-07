import { useDisclosure } from "@nextui-org/modal";
import { Plus, X, Save, LoaderCircle } from "lucide-react";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { useEffect } from "react";

import TTextEditor from "@/components/form/TextEditor/TTextEditor";
import TFile from "@/components/form/TFile";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import TSelect from "@/components/form/TSelect";
import TButton from "@/components/ui/TButton";
import TModal from "@/components/ui/TModal";
import { postCategoryOptions, postsTagsOptions } from "@/constants/pots.constants";
import { useCreatePost } from "@/hooks/post.hooks";
import { arrConverter } from "@/utils/arrConverter";
import { TPost } from "@/types/post.types";
import TTextarea from "@/components/form/TTextarea";
import { useUserInfo } from "@/context/UserInfoProvider";

const CreatePost = () => {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  const { mutate, isLoading, isSuccess } = useCreatePost();
  const { userInfo } = useUserInfo();

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

    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <div>
      <TButton
        color="persian-green-gost"
        endContent={<Plus className="size-5" />}
        size="sm"
        onPress={onOpen}
      >
        Create Post
      </TButton>
      <TModal
        isOpen={isOpen}
        title={{ bgText: "Create", planeText: "Post" }}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <TForm onSubmit={handleSubmit}>
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
                {isLoading ? <LoaderCircle className="animate-spin" /> : "Create"}
              </TButton>
            </div>
          </div>
        </TForm>
      </TModal>
    </div>
  );
};

export default CreatePost;
