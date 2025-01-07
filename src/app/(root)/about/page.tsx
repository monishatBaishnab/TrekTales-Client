import Authors from "./_components/Authors";

import PageHeader from "@/components/ui/PageHeader";
const About = () => {
  return (
    <>
      <PageHeader
        links={[
          { label: "Home", path: "/" },
          { label: "Blogs", path: "/blogs" },
        ]}
        page="About"
        title="About Us"
      />
      <section className="bg-persian-green-600/5">
        <div className="container">
          <div className="mx-auto space-y-6 md:w-2/3">
            <div className="text-center text-xl font-semibold text-shark-950 sm:text-3xl">
              TrekTales is a place where you can find and write your perfect travel blogs.
            </div>
            <p className="paragraph text-center !italic">
              Discover firsthand experiences and insights from travelers around the world. Whether
              you&apos;re looking for hidden gems, practical travel tips, or stories of adventure,
              Notebook is your go-to destination for authentic travel content. Explore, learn, and
              get inspired for your next journey.
            </p>
            <p className="paragraph text-center !italic">
              The best ideas can change the way we travel. At Notebook, we believe that the best
              ideas and stories shape the future of travel. Dive into a diverse collection of travel
              tales and guides, dynamically curated to spark your wanderlust. Embrace the power of
              shared experiences and redefine the way you see the world. Let your next adventure
              begin here!
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <Authors />
        </div>
      </section>
      <section>
        <div className="container mb-10 rounded-lg bg-persian-green-600/5">
          <div className="w-full space-y-3">
            <h1 className="title-1 text-center">want to write on notebook?</h1>
            <h5 className="title-5 text-center">
              Upgrade to premium for exclusive blogging options.
            </h5>
            <p className="paragraph text-center italic">
              Take your blogging experience to the next level with our premium features. Gain access
              to advanced tools, customize your blog layout, and unlock the ability to monetize your
              content. Whether you&apos;re a casual writer or looking to build a professional travel
              blog, our premium options offer everything you need to stand out. Write, share, and
              inspire with Notebook!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
