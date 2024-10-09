import { ScanSearch } from "lucide-react";

const TEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="space-y-3 rounded-lg bg-persian-green-50 p-8">
        <div className="flex justify-center">
          <ScanSearch className="size-10 text-persian-green-600" />
        </div>
        <h1 className="title-1 !text-persian-green-600">Product Not Found</h1>
        <p className="paragraph ">
          We&apos;re sorry, but the product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    </div>
  );
};

export default TEmpty;
