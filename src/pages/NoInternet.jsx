import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

const NoInternet = () => {
  return (
    <div className="flex flex-col gap-2">
      <FontAwesomeIcon icon={faWifi} className="text-[3rem] text-red-800" />
      No Internet connection!
    </div>
  );
};

export default NoInternet;
