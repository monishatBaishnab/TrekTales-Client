import React from "react";

const AuthorCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`flex animate-pulse items-center gap-5 ${className}`}>
      <div className="size-20 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <div className="h-5 w-1/2 rounded bg-gray-300" />
        <div className="h-4 w-2/3 rounded bg-gray-300" />
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-gray-300" />
          <div className="size-8 rounded-full bg-gray-300" />
          <div className="size-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default AuthorCardSkeleton;
