"use client";
import { useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Dot, EllipsisVertical, Plus, Save, X } from "lucide-react";

import TPagination from "@/components/ui/TPagination";
import SectionTitle from "@/components/ui/SectionTitle";
import TButton from "@/components/ui/TButton";
import TFile from "@/components/form/TFile";
import TInput from "@/components/form/TInput";
import TTextarea from "@/components/form/TTextarea";

const studentColumns = [
  { label: "Author Name", uid: "author_name" },
  { label: "Enrolled in", uid: "enrolled_in" },
  { label: "Membership Plan", uid: "membership_plan" },
  { label: "Active from", uid: "active_from" },
  { label: <Dot />, uid: "action" },
];

const data = [
  {
    id: 2,
    author: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "https://example.com/images/jane.jpg",
    },
    enrolled_in: "Data Science Fundamentals",
    membership_plan: "Standard",
    active_from: "2022-09-05",
  },
  {
    id: 3,
    author: {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      image: "https://example.com/images/emily.jpg",
    },
    enrolled_in: "Machine Learning",
    membership_plan: "Premium",
    active_from: "2023-03-10",
  },
  {
    id: 4,
    author: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      image: "https://example.com/images/michael.jpg",
    },
    enrolled_in: "Full-Stack Development",
    membership_plan: "Basic",
    active_from: "2023-02-20",
  },
  {
    id: 5,
    author: {
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      image: "https://example.com/images/sarah.jpg",
    },
    enrolled_in: "Cybersecurity Essentials",
    membership_plan: "Premium",
    active_from: "2023-05-01",
  },
];

const MyPosts = () => {
  const [page, setPage] = useState(2);
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  // const renderPeopleCell = (item: any, key: string) => {
  //   const cellValue = item[key];

  //   if (key === "action") {
  //     return (
  //       <div className="flex justify-end">
  //         <button>
  //           <FiMoreVertical />
  //         </button>
  //       </div>
  //     );
  //   }

  //   return cellValue;
  // };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <SectionTitle bgText="My" planeText="Posts" />
        <TButton
          color="persian-green-gost"
          endContent={<Plus className="size-5" />}
          size="sm"
          onPress={onOpen}
        >
          Create Post
        </TButton>
      </div>
      <div>
        <Table
          isStriped
          aria-label="posts"
          bottomContent={
            <div className="flex justify-center px-6 py-5 pt-0">
              <TPagination page={page} setPage={setPage} totalPage={3} />
            </div>
          }
          classNames={{
            wrapper: "p-0 shadow rounded-lg overflow-hidden",
            th: "text-black text-base px-[24px] py-5 first:!rounded-s-none last:!rounded-e-none",
            td: "px-[24px] py-5 text-black text-base first:before:!rounded-l-none last:before:!rounded-r-none group-data-[odd=true]:before:bg-[#F7F7F8]",
            // tr: "border-t border-t-[#EAEAEA]",
          }}
        >
          <TableHeader columns={studentColumns}>
            <TableColumn key="action">Title</TableColumn>
            <TableColumn key="action">Date</TableColumn>
            <TableColumn key="action">Premium Status</TableColumn>
            <TableColumn key="action">
              <span className="flex items-center justify-end pr-1">
                <Dot />
              </span>
            </TableColumn>
          </TableHeader>

          <TableBody className="p-5" items={data}>
            <TableRow>
              <TableCell>Post Title</TableCell>
              <TableCell>Post Date</TableCell>
              <TableCell>Post Is Premium</TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <button>
                    <EllipsisVertical className="size-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Post Title</TableCell>
              <TableCell>Post Date</TableCell>
              <TableCell>Post Is Premium</TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <button>
                    <EllipsisVertical className="size-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Post Title</TableCell>
              <TableCell>Post Date</TableCell>
              <TableCell>Post Is Premium</TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <button>
                    <EllipsisVertical className="size-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Modal hideCloseButton={true} isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex justify-between gap-1 border-b border-b-shark-200">
            <SectionTitle bgText="Create" classNames={{ base: "!mb-0" }} planeText="Post" />
            <TButton isIconOnly color="gray" size="sm" onPress={onClose}>
              <X className="size-5" />
            </TButton>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-5 py-5">
              <div className="flex items-center gap-5">
                <TInput label="Post Title" name="title" placeholder="Title" />
                <TInput label="Post Category" name="category" placeholder="Category" />
              </div>

              <div className="flex">
                <TInput label="Post Tags" name="tags" placeholder="Tags" />
              </div>

              <TTextarea
                label="Content"
                name="content"
                placeholder="Write a brief details about post."
              />
              <TFile label="Post Thumb" name="images" />
              <div className="flex items-center justify-end gap-2">
                <TButton
                  color="gray"
                  endContent={<X className="size-5" />}
                  size="lg"
                  onPress={onClose}
                >
                  Cancel
                </TButton>
                <TButton endContent={<Save className="size-5" />} size="lg">
                  Save
                </TButton>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyPosts;
