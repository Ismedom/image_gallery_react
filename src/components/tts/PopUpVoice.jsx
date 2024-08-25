import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useCallback } from "react";

const PopUpVoice = ({ handleClose, result, onSearch, sound, time }) => {
  const closePopUp = useCallback(() => {
    handleClose();
    onSearch(result);
  }, [handleClose, onSearch, result]);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "Enter") closePopUp();
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [closePopUp]);

  useEffect(() => {
    if (!time) return;
    const timeOut = setTimeout(() => closePopUp(), 1200);
    return () => clearTimeout(timeOut);
  }, [time, closePopUp]);

  return (
    <div className="bg-white min-h-[300px] p-4 w-full max-h-max sm:w-2/3 md:w-1/2 lg:w-[40%] flex justify-center flex-col items-center rounded-md py-6 ">
      <FontAwesomeIcon icon={faMicrophone} className={`p-4 rounded-full text-2xl ${sound ? "" : "sounded"}`} />
      <p className="py-2">{result}</p>
      <button onClick={closePopUp} className="px-6 py-2 bg-red-500 text-white rounded-full mt-4 hover:bg-red-600">
        Search
      </button>
    </div>
  );
};

export default React.memo(PopUpVoice);
