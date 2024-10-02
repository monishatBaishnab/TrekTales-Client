import AuthorCard from "@/components/ui/AuthorCard";

const page = () => {
  return (
    <section>
      <div className="container">
        <div className="mb-5 inline-flex items-center gap-1">
          <h3 className="title-3 bg-title">Our</h3>
          <h3 className="title-3">Authors</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AuthorCard className="rounded-lg border border-shark-200 p-4" />
        </div>
      </div>
    </section>
  );
};

export default page;
