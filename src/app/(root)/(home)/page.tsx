import Header from "./_components/Header";
import RecentPosted from "./_components/RecentPosted";

import TTextEditor from "@/components/form/TextEditor/TTextEditor";

const Home = () => {
  return (
    <>
      <div className="container">
        <TTextEditor />
      </div>
      <Header />
      <RecentPosted />
    </>
  );
};

export default Home;
