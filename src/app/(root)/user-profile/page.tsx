import MyPosts from "./_components/MyPosts";
import UserProfile from "./_components/UserProfile";

const page = () => {
  return (
    <div className="container">
      <div className="space-y-10">
        <UserProfile />

        <MyPosts />
      </div>
    </div>
  );
};

export default page;
