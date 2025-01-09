import PostCard from "@/components/ui/PostCard";

const RelatedPosts = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      
      {Array.from({ length: 2 }).map((_, id) => (
        <PostCard
          key={id}
          classNames={{
            title: "!title-5",
            contentWrapper: "!mb-0 mt-2",
            base: "!bg-transparent !p-3 border border-persian-green-600/200",
          }}
          isAction={false}
          isDate={false}
          isDescription={false}
          isImage={false}
        />
      ))}
    </div>
  );
};

export default RelatedPosts;
