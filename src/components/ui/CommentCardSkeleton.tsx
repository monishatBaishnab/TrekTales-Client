const CommentCardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2">
      {/* Header section (username and date) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 rounded-md bg-gray-300" /> {/* Placeholder for username */}
          <div className="h-4 w-16 rounded-md bg-gray-300" /> {/* Placeholder for date */}
        </div>
        <div className="flex items-center gap-1">
          <div className="size-6 rounded-full bg-gray-300" />{" "}
          {/* Placeholder for dropdown button */}
        </div>
      </div>
      {/* Content section (comment content) */}
      <div className="h-4 w-full rounded-md bg-gray-300" /> {/* Placeholder for comment text */}
      <div className="h-4 w-5/6 rounded-md bg-gray-300" /> {/* Extra line for content loading */}
      {/* Actions section (buttons like reply) */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-16 rounded-full bg-gray-300" /> {/* Placeholder for reply button */}
      </div>
    </div>
  );
};

export default CommentCardSkeleton;
