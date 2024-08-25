import React, { useEffect, useRef, useState } from "react";

const MoreButtton = ({ func, dataApi }) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    dataApi.length == 0 ? (buttonRef.current.disabled = true) : (buttonRef.current.disabled = false);
  }, [dataApi]);

  //
  return (
    <div className="w-full flex justify-center p-4 mb-10 mt-4 ">
      <button
        ref={buttonRef}
        onClick={() => func()}
        className="px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 select-none">
        See More
      </button>
    </div>
  );
};

export default MoreButtton;
