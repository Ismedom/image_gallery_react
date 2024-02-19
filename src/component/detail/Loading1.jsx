import React from "react";

const Loading1 = () => {
  return (
    <h3 className="text-3xl mb-3 font-bold text-white  mt-2 p-2 rounded-xl absolute top-0 left-[50%] loading1">
      Loading<span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </h3>
  );
};

export default Loading1;
