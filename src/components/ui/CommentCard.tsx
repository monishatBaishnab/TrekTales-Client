import { BsFillReplyFill, BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

import TButton from "./TButton";

const CommentCard = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="title-3">Alexandra H.</h3>
          <p className="paragraph">June 17, 2024</p>
        </div>
        <button className="rounded-sm px-2 py-1 text-shark-600">
          <BsThreeDots />
        </button>
      </div>
      <p className="paragraph !italic">
        “Did you come here for something in particular or just general Riker-bashing? And blowing
        into maximum warp speed, you appeared for an instant to be in two places at once. We have a
        saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the
        assassination attempt on Lieutenant Worf.”
      </p>
      <div className="flex items-center gap-2">
        <TButton
          className="!h-7"
          color="gray"
          radius="full"
          size="sm"
          startContent={<FaRegHeart className="text-base" />}
        >
          12
        </TButton>
        <TButton
          className="!h-7"
          color="gray"
          radius="full"
          size="sm"
          startContent={<BsFillReplyFill className="text-lg" />}
        >
          Reply
        </TButton>
      </div>
    </div>
  );
};

export default CommentCard;
