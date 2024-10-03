import { MoveLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="container">
      <div className="container space-y-5 text-center">
        <h1 className="text-8xl font-bold text-persian-green-600">404</h1>
        <p className="capitalize text-shark-500">the page you are looking for does not exist!</p>
        <Link className="flex items-center justify-center gap-2 text-persian-green-600" href={"/"}>
          <MoveLeft className="size-5" />
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
