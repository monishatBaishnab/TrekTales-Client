import clsx from "clsx";

const TLogo = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex items-end gap-1", className)}>
      <h1 className="title-1 bg-persian-green-600 !text-white">Trek</h1>
      <h5 className="title-5">Tales</h5>
    </div>
  );
};

export default TLogo;
