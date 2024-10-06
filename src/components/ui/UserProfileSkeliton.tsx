const UserProfileSkeleton = () => {
  return (
    <div className="flex animate-pulse">
      {/* Profile Picture Skeleton */}
      <div className="size-28 shrink-0 overflow-hidden rounded-full bg-gray-200" />
      <div className="w-full space-y-3 pl-4">
        {/* Name and Update Profile Button Skeleton */}
        <div className="flex flex-wrap items-center justify-between border-b border-b-shark-200 pb-3">
          <div className="h-6 w-1/2 rounded bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 rounded bg-gray-200" />
          </div>
        </div>
        {/* Bio Skeleton */}
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
