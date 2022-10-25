import React from "react";
import { ImFilesEmpty } from "react-icons/im";
const NoData = ({ text = "No items", size = 45 }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ImFilesEmpty size={size} />
      <div className="mt-2">{text}</div>
    </div>
  );
};

export default NoData;
