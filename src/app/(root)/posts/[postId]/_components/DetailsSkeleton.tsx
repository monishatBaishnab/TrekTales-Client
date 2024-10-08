const DetailsSkeleton = () => {
  return (
    <div className="space-y-10 sm:col-span-2">
      <div className="space-y-4">
        {/* Tag Skeleton */}
        <div className="h-4 w-16 animate-pulse rounded bg-gray-300" />

        {/* Title Skeleton */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />

        {/* Author, Date, and Comments Skeleton */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Author Skeleton */}
          <div className="flex items-center gap-1">
            <div className="size-5 animate-pulse rounded-full bg-gray-300" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-300" />
          </div>

          {/* Date Skeleton */}
          <div className="flex items-center gap-1">
            <div className="size-4 animate-pulse rounded-full bg-gray-300" />
            <div className="h-3 w-24 animate-pulse rounded bg-gray-300" />
          </div>

          {/* Comments Skeleton */}
          <div className="flex items-center gap-1">
            <div className="size-4 animate-pulse rounded-full bg-gray-300" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-300" />
          </div>
        </div>

        {/* Image Skeleton */}
        <div className="h-[350px] w-full animate-pulse rounded-md bg-gray-300" />

        {/* Paragraph Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-300" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-300" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-gray-300" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-gray-300" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-300" />
        </div>
      </div>

      {/* Comments Section Skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-300" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-300" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-gray-300" />
      </div>
    </div>
  );
};

export default DetailsSkeleton;
