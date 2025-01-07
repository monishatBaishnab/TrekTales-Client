import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/theme";

import SectionTitle from "@/components/ui/SectionTitle";
import TButton from "@/components/ui/TButton";
import { postsTagsOptions, postCategoryOptions } from "@/constants/pots.constants";
import { useFilter } from "@/context/FilterProvider";

const Filters = () => {
  const { setSearch, tag: sTag, category: sCategory, setCategory, setTag } = useFilter();

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setTag("");
  };

  return (
    <div className="space-y-10">
      {/* Search */}
      <div>
        <SectionTitle bgText="Search" planeText="Posts" />
        <div className="space-y-7">
          <div className="space-y-7">
            <Input
              placeholder="Search..."
              radius="sm"
              size="lg"
              onChange={(e) => setSearch(e?.target?.value)}
            />
          </div>
        </div>
      </div>
      {/* Search With Categories */}
      <div>
        <SectionTitle bgText="Search" planeText="With Tag's" />
        <div className="flex flex-wrap items-center gap-2">
          {postsTagsOptions.map((tag) => (
            <TButton
              key={tag?.key}
              className={cn("!text-sm", sTag === tag?.key ? "bg-persian-green-600 text-white" : "")}
              color="persian-green-gost"
              size="sm"
              onPress={() => {
                setTag(tag.key);
              }}
            >
              {tag?.label}
            </TButton>
          ))}
        </div>
      </div>
      {/* Search With Tags */}
      <div>
        <SectionTitle bgText="Search" planeText="With Categories" />
        <div className="flex flex-wrap items-center gap-2">
          {postCategoryOptions.map((category) => (
            <TButton
              key={category?.key}
              className={cn(
                "!text-sm",
                sCategory === category?.key ? "bg-persian-green-600 text-white" : ""
              )}
              color="persian-green-gost"
              size="sm"
              onPress={() => {
                setCategory(category.key);
              }}
            >
              {category?.label}
            </TButton>
          ))}
        </div>
      </div>
      <TButton fullWidth onPress={handleClearFilters}>
        Clear Filters
      </TButton>
    </div>
  );
};

export default Filters;
