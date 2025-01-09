"use client";
import { useDisclosure } from "@nextui-org/modal";
import { BadgeCheck, HandCoins, LoaderCircle, Play, UserRound, X } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import TButton from "@/components/ui/TButton";
import { useFetchSingleUser, useVerifyProfile } from "@/hooks/user.hooks";
import { useUserInfo } from "@/context/UserInfoProvider";
import TModal from "@/components/ui/TModal";
import { useFetchUpvotes } from "@/hooks/post.hooks";
import { useRefetchToken } from "@/hooks/auth.hooks";

const UserProfile = ({ routerPath }: { routerPath?: string }) => {
  const router = useRouter();
  const { userInfo, setUserInfoLoading } = useUserInfo() ?? {};
  const {
    isOpen: isVerifyOpen,
    onOpen: onVerifyOpen,
    onClose: onVerifyClose,
    onOpenChange: onVerifyOnChange,
  } = useDisclosure();
  const { mutate: refetchToken } = useRefetchToken();
  const { data: userResponse, isLoading, isFetching } = useFetchSingleUser(userInfo?._id as string);
  const {
    mutate: verifyProfile,
    isLoading: verifyingProfile,
    isSuccess: verifiedProfile,
  } = useVerifyProfile();
  const user = userResponse?.user ?? {};
  // Handlers
  const { data: upvotes } = useFetchUpvotes(userInfo?._id as string);
  const followers = user?.followers?.length;
  const handleVerify = () => {
    verifyProfile({ user: userInfo?._id as string });
  };

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
    <div className="space-y-4">
      {isLoading || isFetching || !userInfo ? (
        <div className="space-y-7">
          {/* Top Area */}
          <div className="flex items-center gap-5">
            {/* Skeleton Profile Image */}
            <div className="size-28 shrink-0 animate-pulse overflow-hidden rounded-full bg-shark-100" />

            {/* Skeleton Profile Info */}
            <div className="flex grow items-start justify-between">
              <div className="space-y-2">
                {/* Skeleton Verified Badge */}
                <div className="h-6 w-24 animate-pulse rounded-md bg-shark-100" />
                {/* Skeleton Name */}
                <div className="h-6 w-32 animate-pulse rounded-md bg-shark-100" />
                {/* Skeleton Email */}
                <div className="h-4 w-48 animate-pulse rounded-md bg-shark-100" />
              </div>

              {/* Skeleton Followers and Verify */}
              <div className="flex items-center gap-3">
                <div className="h-6 w-20 animate-pulse rounded-md bg-shark-100" />
                <div className="h-8 w-16 animate-pulse rounded-md bg-shark-100" />
              </div>
            </div>
          </div>

          {/* Skeleton Bio */}
          <div className="w-full space-y-3">
            <div className="h-4 w-full animate-pulse rounded-md bg-shark-100" />
            <div className="h-4 w-5/6 animate-pulse rounded-md bg-shark-100" />
            <div className="h-4 w-2/3 animate-pulse rounded-md bg-shark-100" />
          </div>
        </div>
      ) : (
        <div className="space-y-7">
          {/* Top Area */}
          <div className="flex items-center gap-5">
            {/* Profile Image */}
            <div className="size-28 shrink-0 overflow-hidden rounded-full">
              {user?.profilePicture ? (
                <img
                  alt={user?.name}
                  className="size-full object-cover"
                  src={user?.profilePicture}
                />
              ) : (
                <div className="flex size-full items-center justify-center rounded-full border border-shark-50 bg-white">
                  <UserRound className="size-8 text-shark-700" />
                </div>
              )}
            </div>
            {/* Profile info */}
            <div className="flex grow items-start justify-between">
              <div>
                {user?.isVerified && (
                  <div className="inline-flex items-center gap-2 rounded-md border border-persian-green-100 bg-persian-green-50 px-2 py-1 text-sm font-medium text-persian-green-600">
                    <BadgeCheck className="size-4" />
                    <span>VERIFIED</span>
                  </div>
                )}
                <h2 className="title-2">{user?.name}</h2>
                <p className="paragraph">{user?.email}</p>
              </div>

              {/* Followers and verify */}
              <div className="flex items-center gap-3">
                <h5 className="title-5 !text-shark-600">{followers} Followers</h5>
                <div className="flex items-center gap-2">
                  {!user?.isVerified ? (
                    <TButton
                      className="!gap-1 !text-sm !text-shark-600"
                      color="gray"
                      size="sm"
                      startContent={<BadgeCheck className="size-4" />}
                      onPress={onVerifyOpen}
                    >
                      Verify
                    </TButton>
                  ) : (
                    <TButton
                      isDisabled
                      className="!gap-1 !text-sm !text-shark-600"
                      color="gray"
                      size="sm"
                      startContent={<BadgeCheck className="size-4" />}
                    >
                      Verified
                    </TButton>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Paragraph */}
          <div className="w-full space-y-3">
            <p className="paragraph">{user?.bio}</p>
          </div>
        </div>
      )}
      <TButton
        color="gray"
        radius="sm"
        onPress={() => router.push(routerPath ? routerPath : "/user/settings")}
      >
        Edit Profile
      </TButton>
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
    </div>
  );
};

export default UserProfile;
