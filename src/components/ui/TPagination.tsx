"use client";

import { Pagination } from "@nextui-org/pagination";
import { Dispatch, SetStateAction } from "react";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";

import TButton from "./TButton";

type TTPaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
};

const TPagination = ({ page, setPage, totalPage }: TTPaginationProps) => {
  return (
    <div className="inline-flex items-center justify-between gap-4">
      <TButton
        color="persian-green-gost"
        isDisabled={page === 1}
        radius="sm"
        startContent={<HiOutlineArrowLongLeft className="text-lg" />}
        onPress={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
      >
        Prev.
      </TButton>
      <Pagination
        loop
        classNames={{
          item: "!text-shark-500 !bg-transparent border border-[#C4C4C4] data-[focus-visible=true]:outline-0 data-[hover=true]:!bg-persian-green-600 data-[hover=true]:!text-white data-[hover=true]:!border-persian-green-600",
          cursor: "bg-persian-green-600",
        }}
        initialPage={1}
        page={page}
        radius="sm"
        size="lg"
        total={totalPage}
        onChange={setPage}
      />

      <TButton
        color="persian-green-gost"
        endContent={<HiOutlineArrowLongRight className="text-lg" />}
        isDisabled={page === totalPage}
        radius="sm"
        onPress={() => setPage((prev) => (prev < totalPage ? prev + 1 : prev))}
      >
        Next
      </TButton>
    </div>
  );
};

export default TPagination;
