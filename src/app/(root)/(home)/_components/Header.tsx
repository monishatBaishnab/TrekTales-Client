import PostCard from "@/components/ui/PostCard";
import SectionTitle from "@/components/ui/SectionTitle";

const Header = () => {
  return (
    <section className="bg-persian-green-600/5">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 md:col-span-2">
            <SectionTitle bgText="Featured" planeText="This Month" />
            <div className="max-h-[400px] space-y-10 overflow-x-hidden overscroll-y-auto lg:pr-10">
              {Array.from({ length: 3 }).map((_, id) => (
                <PostCard key={id} />
              ))}
            </div>
          </div>
          <div className="space-y-10">
            <SectionTitle bgText="Popular" planeText="This Month" />
            <div className="max-h-[400px] space-y-5 overflow-x-hidden overscroll-y-auto lg:pr-2">
              {Array.from({ length: 3 }).map((_, id) => (
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
