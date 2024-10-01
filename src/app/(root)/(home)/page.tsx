import PostListCard from "@/components/ui/PostListCard";

const Home = () => {
  return (
    <section className="bg-persian-green-600/5">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 md:col-span-2">
            <div className="inline-flex items-center gap-1">
              <h3 className="title-3 bg-title">Featured</h3>
              <h3 className="title-3">This month</h3>
            </div>
            <div className="max-h-[400px] space-y-10 overflow-x-hidden overscroll-y-auto lg:pr-10">
              <PostListCard />
              <PostListCard />
            </div>
          </div>
          <div className="space-y-10">
            <div className="inline-flex items-center gap-1">
              <h3 className="title-3 bg-title">Popular</h3>
              <h3 className="title-3">Posts</h3>
            </div>
            <div className="max-h-[400px] space-y-5 overflow-x-hidden overscroll-y-auto lg:pr-2">
              <PostListCard
                classNames={{
                  title: "!title-5",
                  contentWrapper: "!mb-0 mt-2",
                  base:'!bg-transparent !p-3 border border-persian-green-600/200'
                }}
                isAction={false}
                isDate={false}
                isDescription={false}
                isImage={false}
              />
              <PostListCard
                classNames={{
                  title: "!title-5",
                  contentWrapper: "!mb-0 mt-2",
                  base:'!bg-transparent !p-3 border border-persian-green-600/200'
                }}
                isAction={false}
                isDate={false}
                isDescription={false}
                isImage={false}
              />
              <PostListCard
                classNames={{
                  title: "!title-5",
                  contentWrapper: "!mb-0 mt-2",
                  base:'!bg-transparent !p-3 border border-persian-green-600/200'
                }}
                isAction={false}
                isDate={false}
                isDescription={false}
                isImage={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
