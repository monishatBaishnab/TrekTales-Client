type TSectionTitle = {
  bgText?: string;
  planeText?: string;
  classNames?: { base?: string; bgText?: string; planeText?: string };
};

const SectionTitle = ({ bgText, planeText, classNames }: TSectionTitle) => {
  return (
    <div className={`mb-5 inline-flex items-center gap-1 ${classNames?.base}`}>
      <h3 className={`title-3 bg-title ${classNames?.bgText}`}>{bgText}</h3>
      <h3 className={`title-3 ${classNames?.planeText}`}>{planeText}</h3>
    </div>
  );
};

export default SectionTitle;
