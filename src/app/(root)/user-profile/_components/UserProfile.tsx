"use client";
import { useDisclosure } from "@nextui-org/modal";
import { LoaderCircle, Pencil, Save, X } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

import TButton from "@/components/ui/TButton";
import { useFetchSingleUser, useUpdateProfile } from "@/hooks/user.hooks";
import { useUserInfo } from "@/context/UserInfoProvider";
import UserProfileSkeleton from "@/components/ui/UserProfileSkeleton";
import TForm from "@/components/form/TForm";
import TDatePicker from "@/components/form/TDatePicker";
import TFile from "@/components/form/TFile";
import TInput from "@/components/form/TInput";
import TTextarea from "@/components/form/TTextarea";
import TSelect from "@/components/form/TSelect";
import { travelerInterests } from "@/constants/global.constats";
import { TUser } from "@/types/user.types";
import TModal from "@/components/ui/TModal";
import UserProfileView from "@/components/modules/user/UserProfileView";

const UserProfile = () => {
  const { userInfo } = useUserInfo() ?? {};
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { data: user, isLoading, isFetching } = useFetchSingleUser(userInfo?._id as string);
  const { mutate, isLoading: updatingUser, isSuccess: updatedUser } = useUpdateProfile();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const selectedInterestsSet = new Set(data?.interests as string[]);
    const selectedInterestsArr: string[] = Array.from(selectedInterestsSet);

    const userData: Partial<TUser> = { ...data, interests: selectedInterestsArr };

    // Remove profilePhoto from the userData
    delete userData.profilePicture;

    // Create FormData instance
    const formData = new FormData();

    formData.append("data", JSON.stringify(userData));

    if (data.profilePhoto) {
      formData.append("image", data.profilePhoto);
    }
    // Pass FormData to the mutate function
    mutate({ id: userInfo?._id as string, userData: formData });
  };

  useEffect(() => {
    if (!updatingUser && updatedUser) {
      onClose();
    }
  }, [updatedUser, updatingUser]);

  return (
    <>
      {isLoading || isFetching || !userInfo ? (
        <UserProfileSkeleton />
      ) : (
        <UserProfileView
          action={
            <TButton
              className="!gap-1 !text-sm !text-shark-600"
              color="gray"
              size="sm"
              startContent={<Pencil className="size-4" />}
              onPress={onOpen}
            >
              Update Profile
            </TButton>
          }
          user={user}
        />
      )}

      <TModal
        isOpen={isOpen}
        title={{ bgText: "Update", planeText: "Profile" }}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <TForm
          defaultValues={{
            name: user?.name,
            bio: user?.bio,
            profilePhoto: user?.profilePhoto,
            dateOfBirth: user?.dateOfBirth,
            email: user?.email,
            interests: ["SoloTravel", "CulinaryExploration"],
          }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-5 py-5">
            <TInput label="Full Name" name="name" placeholder="Name" />

            <div className="flex items-center gap-5">
              <TInput isDisabled label="Email Address" name="email" placeholder="Email" />
              <TDatePicker label="Date Of Birth" name="dateOfBirth" />
            </div>
            <TSelect
              label="Interests"
              name="interests"
              options={travelerInterests}
              placeholder="Select your interests."
              selectionMode="multiple"
            />
            <TTextarea
              label="Profile Bio"
              name="bio"
              placeholder="Write a short overview about you."
            />

            <TFile label="Profile Picture" name="profilePicture" />

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
      </TModal>
    </>
  );
};

export default UserProfile;
