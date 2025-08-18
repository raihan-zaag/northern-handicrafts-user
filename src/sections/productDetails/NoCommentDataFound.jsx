import React from "react";

const NoCommentDataFound = ({ message = "No Data Found" }) => {
  return (
    <div className="w-full px-4 py-12 bg-[#F6F6F6] text-primary text-lg font-medium flex justify-center text-center">
      {message}
    </div>
  );
};

export default NoCommentDataFound;
