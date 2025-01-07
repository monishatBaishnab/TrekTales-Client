import { CheckCircle, MoveRight } from "lucide-react";
import Link from "next/link";

import FeaturedPosted from "./_components/FeaturedPosted";
import RecentPosted from "./_components/RecentPosted";
import Header from "./_components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <FeaturedPosted />
      <RecentPosted />

      <div className="container grid grid-cols-1 items-center gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <div className="space-y-1">
            <h5 className="font-medium uppercase text-persian-green-600">Tips For Travels</h5>
            <h1 className="title-1">
              Travel Tips & Insights from <br className="hidden sm:inline-block" /> Fellow Explorers
            </h1>
          </div>
          <p className="paragraph !text-base">
            Our blog is filled with firsthand travel experiences to help you make the most of your
            next trip. Here are some key tips from fellow travelers:
          </p>
          <ul className="space-y-1.5">
            {[
              "Pack light with essentials; you'll thank yourself later.",
              "Avoid tourist spots; find local hidden gems instead.",
              "Engage with locals for the best travel tips.",
              "Embrace the unexpected and enjoy the adventure ahead.",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-shark-600">
                <CheckCircle className="mt-0.5 size-4 text-persian-green-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img alt="Travel" src="https://i.ibb.co.com/0DX6QHQ/fIMG.png" />
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-5 bg-slate-50 !py-10 md:grid-cols-2 md:gap-10">
        <div className="space-y-4">
          <h5 className="font-medium uppercase text-persian-green-600">About Us</h5>
          <h2 className="title-2">Inspiring Travelers, Empowering Storytellers</h2>
          <p className="paragraph">
            Discover firsthand experiences and insights from travelers around the world. Whether
            you&apos;re looking for hidden gems, practical travel tips, or stories of adventure,
            Notebook is your go-to destination for authentic travel content. Explore, learn, and get
            inspired for your next journey.
          </p>
          <Link className="flex items-center gap-2 text-persian-green-600" href="/about">
            Read more <MoveRight />
          </Link>
        </div>
        <div className="space-y-4">
          <h5 className="font-medium uppercase text-persian-green-600">Our Mission</h5>
          <h2 className="title-2">Authentic Stories, Lasting Connections</h2>
          <p className="paragraph">
            At TrekTales, our mission is to inspire and empower travelers and storytellers worldwide
            by fostering a platform that celebrates creativity, connection, and exploration. We aim
            to provide authentic..
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
