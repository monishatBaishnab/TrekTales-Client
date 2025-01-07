import { Minus } from "lucide-react";
import Link from "next/link";

const PageHeader = ({
  page,
  links,
  title
}: {
    title:string;
  page: string;
  links: { path: string; label: string }[];
}) => {
  return (
    <section className="bg-shark-50/70">
      <div className="container flex items-center justify-between !py-10">
        <h2 className="title-2">{title}</h2>
        <div className="">
          <div className="inline-flex items-center rounded-md border border-shark-100 bg-shark-50 px-4 py-2 text-shark-600">
            {links?.map((link) => (
              <>
                <Link className="text-persian-green-600" href={link?.path}>
                  {link?.label}
                </Link>
                <Minus className="mt-0.5 size-5 rotate-90" />
              </>
            ))}
            <span>{page}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
