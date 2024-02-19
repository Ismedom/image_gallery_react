import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = ({ searchValue, setSearchValue, change }) => {
  const searchButtonRef = useRef(null);
  function searchFu() {
    searchButtonRef.current.click();
  }

  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) searchFu();
  });

  return (
    <header className="flex gap-2 m-4  flex-wrap">
      <div className="flex gap-1 items-center rounded-3xl overflow-hidden bg-blue-50  border border-gray-300 hover:outline outline-blue-400 md:w-[400px]">
        <select className="bg-transparent h-full cursor-pointer outline-none text-xl pl-4 pr-2">
          <option>Photo</option>
        </select>
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          type="text"
          placeholder="Your Search..."
          className="p-2 text-lg rounded-3xl border-none outline-none bg-transparent w-full"
        />
      </div>
      <button
        ref={searchButtonRef}
        onClick={() => change()}
        className="px-6 py-2 flex gap-2 items-center bg-blue-500 text-white rounded-3xl hover:bg-blue-600">
        <FontAwesomeIcon icon={faSearch} />
        Search
      </button>
    </header>
  );
};

export default Header;
