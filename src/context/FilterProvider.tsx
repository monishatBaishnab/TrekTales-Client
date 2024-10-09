import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type TFilterProvider = {
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  tag: string | undefined;
  setTag: Dispatch<SetStateAction<string | undefined>>;
  category: string | undefined;
  setCategory: Dispatch<SetStateAction<string | undefined>>;
};

const FilterContext = createContext<TFilterProvider | null>(null);

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === null) {
    throw new Error("Filter must be used within the FilterProvider context");
  }

  return context;
};

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [tag, setTag] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);

  return (
    <FilterContext.Provider value={{ search, setSearch, tag, setTag, category, setCategory }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
