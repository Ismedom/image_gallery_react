import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import VoiceRocord from "./VoiceRocord/VoiceRocord";

const Header = ({ searchValue, setSearchValue, change }) => {
  const searchButtonRef = useRef(null);
  const inputButton = useRef(null);
  function searchFu() {
    if (searchButtonRef == null) return;
    searchButtonRef.current.click();
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 13) searchFu();
    };
    window.addEventListener("keyup", handler);
    return () => window.removeEventListener("keyup", handler);
  }, []);

  useEffect(() => {
    const shortCutToFocus = (e) => {
      if (e.altKey && e.keyCode === 83) inputButton.current.focus();
    };
    window.addEventListener("keydown", shortCutToFocus);
    return () => window.removeEventListener("keydown", shortCutToFocus);
  }, []);

  useEffect(() => {
    const shortCutToDelete = (e) => {
      console.log(e.keyCode);
      console.log(e.keyCode);
      if ((e.ctrlKey && e.keyCode === 89) || (e.altKey && e.keyCode === 81))
        setSearchValue("");
    };
    window.addEventListener("keydown", shortCutToDelete);
    return () => window.removeEventListener("keydown", shortCutToDelete);
  }, []);

  return (
    <header className="flex gap-2 m-4  flex-wrap">
      <div className="flex gap-1 items-center rounded-3xl overflow-hidden bg-blue-50  border border-gray-300 hover:outline outline-blue-400 md:w-[400px]">
        <select className="bg-transparent h-full cursor-pointer outline-none text-xl pl-4 pr-2 border-none">
          <option>Photo</option>
        </select>
        <input
          ref={inputButton}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          type="text"
          placeholder="Your Search..."
          className="p-2 text-lg rounded-3xl border-none outline-none bg-transparent w-full"
        />
        <VoiceRocord setSearchValue={setSearchValue} searchFu={searchFu} />
      </div>
      <button
        ref={searchButtonRef}
        onClick={() => change()}
        className="px-6 py-2 flex gap-2 items-center bg-blue-500 text-white rounded-3xl hover:bg-blue-600 select-none">
        <FontAwesomeIcon icon={faSearch} />
        Search
      </button>
    </header>
  );
};

export default Header;
