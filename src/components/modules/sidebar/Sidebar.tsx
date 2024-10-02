import { Input } from "@nextui-org/input";
import { FiSearch } from "react-icons/fi";

import AuthorCard from "@/components/ui/AuthorCard";
import TButton from "@/components/ui/TButton";
import SectionTitle from "@/components/ui/SectionTitle";

const categories = [
  { id: 1, name: "Travel" },
  { id: 2, name: "Lifestyle" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Technology" },
  { id: 5, name: "Business" },
  { id: 6, name: "Design" },
  { id: 7, name: "Health" },
  { id: 8, name: "Food" },
  { id: 9, name: "Art" },
];

const Sidebar = () => {
  return (
    <div className="space-y-10">
      {/* Search */}
      <div>
        <SectionTitle bgText="Search" planeText="Posts" />
        <div className="space-y-7">
          <div className="space-y-7">
            <Input
              endContent={
                <TButton isIconOnly className="!h-8" color="gray" size="sm">
                  <FiSearch className="text-lg" />
                </TButton>
              }
              placeholder="Search..."
              radius="sm"
              size="lg"
            />
          </div>
        </div>
      </div>
      {/* Best Authors */}
      <div>
        <SectionTitle bgText="Top" planeText="Authors" />
        <div className="space-y-7">
          <div className="space-y-7">
            {Array.from({ length: 3 }).map((_, id) => (
              <AuthorCard key={id} />
            ))}
          </div>
        </div>
      </div>
      {/* Categories */}
      <div>
        <SectionTitle bgText="Categories" />
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, id) => (
            <li
              key={id}
              className="flex items-center justify-between gap-5 border-b border-dashed border-b-persian-green-600/10 pb-2 last:border-b-0"
            >
              <span>Life Style</span>
              <span>5</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Todays Update */}
      <div>
        <SectionTitle bgText="Today's" planeText="Update" />
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, id) => (
            <div
              key={id}
              className="flex min-h-28 flex-col items-center justify-center rounded-lg bg-persian-green-600/10"
            >
              <h1 className="title-1 !text-persian-green-600">14</h1>
              <h5 className="title-5 !font-normal !text-shark-600">New Posts</h5>
            </div>
          ))}
        </div>
      </div>
      {/* Search With Tags */}
      <div>
        <SectionTitle bgText="Search" planeText="With Tag's" />
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <TButton key={category?.id} className="!text-sm" color="persian-green-gost" size="sm">
              {category?.name}
            </TButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
