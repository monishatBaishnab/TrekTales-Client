import Link from "next/link";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

const NotFound = () => {
  return (
    <section className="container">
      <div className="container space-y-5 text-center">
        <h1 className="text-8xl font-bold text-persian-green-600">404</h1>
        <p className="capitalize text-shark-500">the page you are looking for does not exist!</p>
        <Link className="flex items-center justify-center gap-2 text-persian-green-600" href={"/"}>
          <HiMiniArrowLongLeft className="text-lg" />
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
