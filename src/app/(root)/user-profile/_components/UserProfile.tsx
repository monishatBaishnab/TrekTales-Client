"use client";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { BadgeCheck, LoaderCircle, Pencil, Save, UserRound, X } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import TButton from "@/components/ui/TButton";
import SectionTitle from "@/components/ui/SectionTitle";
import { useFetchSingleUser, useUpdateProfile } from "@/hooks/user.hooks";
import { useUserInfo } from "@/context/UserInfoProvider";
import UserProfileSkeleton from "@/components/ui/UserProfileSkeliton";
import TForm from "@/components/form/TForm";
import TDatePicker from "@/components/form/TDatePicker";
import TFile from "@/components/form/TFile";
import TInput from "@/components/form/TInput";
import TTextarea from "@/components/form/TTextarea";

const UserProfile = () => {
  const { userInfo } = useUserInfo() ?? {};
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { data: user, isLoading, isFetching } = useFetchSingleUser(userInfo?._id as string);
  const { mutate, isLoading: updatingUser } = useUpdateProfile();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = { ...data };

    // Remove profilePhoto from the userData
    delete userData.profilePhoto;

    // Create FormData instance
    const formData = new FormData();

    formData.append("data", JSON.stringify(userData));

    if (data.profilePhoto) {
      formData.append("image", data.profilePhoto);
    }
    // Pass FormData to the mutate function
    mutate({ id: userInfo?._id as string, userData: formData });
  };

  return (
    <>
      {isLoading || isFetching || !userInfo ? (
        <UserProfileSkeleton />
      ) : (
        <div className="flex flex-col items-center gap-7 rounded-lg border border-shark-100 bg-shark-50 p-10 sm:flex-row">
          <div className="size-28 shrink-0 overflow-hidden rounded-full">
            {user?.profilePicture ? (
              <img alt={user?.name} className="size-full object-cover" src={user?.profilePicture} />
            ) : (
              <div className="flex size-full items-center justify-center rounded-full border border-shark-50 bg-white">
                <UserRound className="size-8 text-shark-700" />
              </div>
            )}
          </div>
          <div className="w-full space-y-3">
            <div className="flex flex-wrap items-center justify-between border-b border-b-shark-200 pb-3">
              <h2 className="title-2 flex items-center gap-1">
                <span>{user?.name}</span>{" "}
                {user?.isVerified && <BadgeCheck className="size-5 text-persian-green-600" />}
              </h2>
              <div className="flex items-center gap-2">
                <TButton
                  className="!gap-1 !text-sm !text-shark-600"
                  color="gray"
                  size="sm"
                  startContent={<Pencil className="size-4" />}
                  onPress={onOpen}
                >
                  Update Profile
                </TButton>
              </div>
            </div>
            <p className="paragraph">{user?.bio}</p>
          </div>
        </div>
      )}
      <Modal
        hideCloseButton={true}
        isOpen={isOpen}
        scrollBehavior="outside"
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex justify-between gap-1 border-b border-b-shark-200">
            <SectionTitle bgText="Update" classNames={{ base: "!mb-0" }} planeText="Profile" />
            <TButton isIconOnly color="gray" size="sm" onPress={onClose}>
              <X className="size-5" />
            </TButton>
          </ModalHeader>
          <ModalBody>
            <TForm
              defaultValues={{
                name: user?.name,
                bio: user?.bio,
                profilePhoto: user?.profilePhoto,
                dateOfBirth: user?.dateOfBirth,
                email: user?.email,
              }}
              onSubmit={handleSubmit}
            >
              <div className="space-y-5 py-5">
                <TInput label="Full Name" name="name" placeholder="Name" />

                <div className="flex items-center gap-5">
                  <TInput isDisabled label="Email Address" name="email" placeholder="Email" />
                  <TDatePicker label="Date Of Birth" name="dateOfBirth" />
                </div>

                <TTextarea
                  label="Profile Bio"
                  name="bio"
                  placeholder="Write a short overview about you."
                />

                <TFile label="Profile Picture" name="profilePhoto" />

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
                    {updatingUser ? <LoaderCircle className="animate-spin" /> : "Save"}
                  </TButton>
                </div>
              </div>
            </TForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;
