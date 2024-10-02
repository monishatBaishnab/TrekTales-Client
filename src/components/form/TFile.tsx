/* eslint-disable no-undef */
import { ChangeEvent, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";
type TFile = {
  name: string;
  multiple?: boolean;
  label?: string;
  // files: File[];
  // setFiles: Dispatch<SetStateAction<File[]>>;
};
const TFile = ({ name, multiple = false, label }: TFile) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e?.target?.files;

    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles)?.filter(
      (file) => !files?.some((existingFile) => existingFile?.name === file?.name)
    );

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImages((prev) => [...prev, reader.result as string]);
    };

    reader.readAsDataURL(newFiles[0]);

    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base text-shark-800" htmlFor={name}>
          {label}
        </label>
      )}
      <label
        className="flex cursor-pointer items-center gap-3 rounded border border-dashed border-gray-200 bg-white p-3 transition-all hover:bg-gray-50/10"
        htmlFor={name}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-50">
          <FaRegFolderOpen className="text-xl text-gray-500" />
        </div>
        <div>
          <h5 className="font-semibold text-gray-600">Upload Your Files</h5>
          <small className="text-sm text-gray-400">Click to browse JPG or PNG formats.</small>
        </div>
      </label>
      <input
        className="hidden"
        id={name}
        multiple={multiple}
        name={name}
        type="file"
        onChange={(e) => handleFileUpload(e)}
      />
      {/* {previewImages?.length > 0 ? (
        <div className="flex flex-wrap items-center gap-5">
          {previewImages?.map((image) => (
            <div
              key={image}
              className="size-[120px] rounded border border-dashed border-slate-200 p-2"
            >
              <img
                alt="Files"
                className="size-full rounded-sm object-cover object-center"
                src={image}
              />
            </div>
          ))}
        </div>
      ) : null} */}
    </div>
  );
};

export default TFile;
