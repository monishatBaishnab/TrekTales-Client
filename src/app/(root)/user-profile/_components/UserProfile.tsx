"use client";
import { useDisclosure } from "@nextui-org/modal";
import { BadgeCheck, HandCoins, LoaderCircle, Pencil, Play, Save, X } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

import TUserTable from "./TUserTable";

import TButton from "@/components/ui/TButton";
import { useFetchSingleUser, useUpdateProfile, useVerifyProfile } from "@/hooks/user.hooks";
import { useUserInfo } from "@/context/UserInfoProvider";
import UserProfileSkeleton from "@/components/ui/UserProfileSkeleton";
import TForm from "@/components/form/TForm";
import TDatePicker from "@/components/form/TDatePicker";
import TFile from "@/components/form/TFile";
import TInput from "@/components/form/TInput";
import TTextarea from "@/components/form/TTextarea";
import { TUser } from "@/types/user.types";
import TModal from "@/components/ui/TModal";
import UserProfileView from "@/components/modules/user/UserProfileView";
import { useFetchUpvotes } from "@/hooks/post.hooks";
import { useRefetchToken } from "@/hooks/auth.hooks";

const UserProfile = () => {
  const { userInfo, setUserInfoLoading } = useUserInfo() ?? {};
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isVerifyOpen,
    onOpen: onVerifyOpen,
    onClose: onVerifyClose,
    onOpenChange: onVerifyOnChange,
  } = useDisclosure();
  const { mutate: refetchToken } = useRefetchToken();
  const { data: userResponse, isLoading, isFetching } = useFetchSingleUser(userInfo?._id as string);
  const { mutate, isLoading: updatingUser, isSuccess: updatedUser } = useUpdateProfile();
  const {
    mutate: verifyProfile,
    isLoading: verifyingProfile,
    isSuccess: verifiedProfile,
  } = useVerifyProfile();
  const user = userResponse?.user ?? {};
  // Handlers
  const { data: upvotes } = useFetchUpvotes(userInfo?._id as string);
  //function for update profile
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData: Partial<TUser> = { ...data };

    // Remove profilePhoto from the userData
    delete userData.profilePicture;

    // Create FormData instance
    const formData = new FormData();

    formData.append("data", JSON.stringify(userData));

    if (data.profilePicture) {
      formData.append("image", data.profilePicture);
    }
    // Pass FormData to the mutate function
    mutate({ id: userInfo?._id as string, userData: formData });
  };

  const handleVerify = () => {
    verifyProfile({ user: userInfo?._id as string });
  };

  // Effects
  useEffect(() => {
    if (!updatingUser && updatedUser) {
      onClose();
    }
  }, [updatedUser, updatingUser]);

  useEffect(() => {
    if (verifiedProfile && !verifyingProfile) {
      onVerifyClose();
    }
  }, [verifiedProfile]);

  useEffect(() => {
    if (user?.isVerified) {
      refetchToken();
      setUserInfoLoading(true);
    }
  }, [user]);

  return (
    <>
      {isLoading || isFetching || !userInfo ? (
        <UserProfileSkeleton />
      ) : (
        <UserProfileView
          action={
            <div className="flex gap-3">
              {Number(upvotes) > 0 && !user?.isVerified ? (
                <TButton
                  className="!gap-1 !text-sm !text-shark-600"
                  color="gray"
                  size="sm"
                  startContent={<BadgeCheck className="size-4" />}
                  onPress={onVerifyOpen}
                >
                  Verify
                </TButton>
              ) : null}
              <TButton
                className="!gap-1 !text-sm !text-shark-600"
                color="gray"
                size="sm"
                startContent={<Pencil className="size-4" />}
                onPress={onOpen}
              >
                Update
              </TButton>
            </div>
          }
          user={user}
        />
      )}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TUserTable
          title="My Followers"
          users={user?.followers}
          usersFetching={isFetching}
          usersLoading={isLoading || !userInfo?._id}
        />
        <TUserTable
          title="Authors I Follow"
          users={userResponse?.followedUsers}
          usersFetching={isFetching}
          usersLoading={isLoading || !userInfo?._id}
        />
      </div>

      {/* Update profile Modal */}
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

      {/* Payment verification modal */}
      <TModal
        isOpen={isVerifyOpen}
        size="sm"
        title={{ bgText: "Verify", planeText: "Profile" }}
        onClose={onVerifyClose}
        onOpenChange={onVerifyOnChange}
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex size-24 items-center justify-center rounded-full bg-persian-green-600/20 text-persian-green-600">
            <HandCoins className="size-10" />
          </div>
          <h2 className="title-2 !text-persian-green-600">Payment Verification</h2>
          <p className="paragraph text-center">
            You need to pay <strong>1050 Tk</strong> to verify your account.
          </p>
          <div className="flex items-center gap-3">
            <TButton color="gray" startContent={<X className="size-4" />} onPress={onVerifyClose}>
              Cancel
            </TButton>
            <TButton
              className="!min-w-[116px]"
              startContent={<Play className="size-4" />}
              onPress={handleVerify}
            >
              {verifyingProfile ? <LoaderCircle className="animate-spin" /> : "Continue"}
            </TButton>
          </div>
        </div>
      </TModal>
    </>
  );
};

export default UserProfile;
