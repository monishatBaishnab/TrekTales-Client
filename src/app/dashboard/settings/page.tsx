"use client";

import { Save, LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, FieldValues } from "react-hook-form";

import TDatePicker from "@/components/form/TDatePicker";
import TFile from "@/components/form/TFile";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import TTextarea from "@/components/form/TTextarea";
import TButton from "@/components/ui/TButton";
import { useUserInfo } from "@/context/UserInfoProvider";
import { useRefetchToken } from "@/hooks/auth.hooks";
import { useFetchSingleUser, useUpdateProfile } from "@/hooks/user.hooks";
import { TUser } from "@/types/user.types";

const UserSettings = () => {
  const { userInfo, setUserInfoLoading } = useUserInfo() ?? {};
  const { mutate: refetchToken } = useRefetchToken();
  const { data: userResponse } = useFetchSingleUser(userInfo?._id as string);
  const { mutate, isLoading: updatingUser } = useUpdateProfile();

  const user = userResponse?.user ?? {};

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

  useEffect(() => {
    if (user?.isVerified) {
      refetchToken();
      setUserInfoLoading(true);
    }
  }, [user]);

  return (
    <div className="space-y-2 rounded-lg bg-white p-5">
      <h3 className="title-2">User Settings</h3>
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
        {!userInfo ? (
          <div className="space-y-5 py-5">
            {/* Skeleton for Full Name Input */}
            <div>
              <div className="h-5 w-32 rounded bg-gray-200" /> {/* Label Skeleton */}
              <div className="mt-2 h-10 rounded bg-gray-200" /> {/* Input Skeleton */}
            </div>

            {/* Skeleton for Email Address and Date of Birth */}
            <div className="flex items-center gap-5">
              <div className="flex-1">
                <div className="h-5 w-40 rounded bg-gray-200" /> {/* Label Skeleton */}
                <div className="mt-2 h-10 rounded bg-gray-200" /> {/* Input Skeleton */}
              </div>
              <div className="flex-1">
                <div className="h-5 w-40 rounded bg-gray-200" /> {/* Label Skeleton */}
                <div className="mt-2 h-10 rounded bg-gray-200" /> {/* Date Picker Skeleton */}
              </div>
            </div>

            {/* Skeleton for Profile Bio */}
            <div>
              <div className="h-5 w-40 rounded bg-gray-200" /> {/* Label Skeleton */}
              <div className="mt-2 h-20 rounded bg-gray-200" /> {/* Textarea Skeleton */}
            </div>

            {/* Skeleton for Profile Picture */}
            <div>
              <div className="h-5 w-40 rounded bg-gray-200" /> {/* Label Skeleton */}
              <div className="mt-2 h-10 w-40 rounded bg-gray-200" /> {/* File Input Skeleton */}
            </div>

            {/* Skeleton for Save Button */}
            <div className="flex items-center justify-end gap-2">
              <div className="h-10 w-24 rounded bg-gray-200" /> {/* Button Skeleton */}
            </div>
          </div>
        ) : (
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
              <TButton endContent={<Save className="size-5" />} size="lg" type="submit">
                {updatingUser ? <LoaderCircle className="animate-spin" /> : "Save"}
              </TButton>
            </div>
          </div>
        )}
      </TForm>
    </div>
  );
};

export default UserSettings;
