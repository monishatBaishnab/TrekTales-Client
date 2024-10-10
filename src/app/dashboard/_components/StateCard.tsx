import { ReactNode } from "react";

type TClassNames = {
  base?: string;
  icon?: string;
};

type TStateCard = {
  icon: ReactNode;
  subTitle: string;
  title: string;
  paragraph?: string;
  classNames?: TClassNames;
};

const StateCard = ({ icon, subTitle, title, paragraph, classNames }: TStateCard) => {
  return (
    <div>
      <div className="rounded-md bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div>
              <h6 className="title-6 !text-shark-500">{subTitle}</h6>
              <h1 className="title-1">{title}</h1>
            </div>
          </div>
          <div
            className={`flex size-16 items-center justify-center rounded-md bg-persian-green-600/10 text-persian-green-600 ${classNames?.icon}`}
          >
            {icon}
          </div>
        </div>
        {paragraph && <p className="paragraph mt-2">{paragraph}</p>}
      </div>
    </div>
  );
};

export default StateCard;
