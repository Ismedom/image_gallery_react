import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Item = ({ imgSrc, artistName, url, id }) => {
  return (
    <article className="max-w-[400px] relative select-none overflow-hidden group item" id={id}>
      <img src={imgSrc} alt={id} className="w-full transition-all duration-300 z-0 group-hover:scale-105" />
      <main className="z-10 absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-between p-4">
        <div className=" flex gap-3 justify-end absolute right-4 transition-all duration-300  top-[-100%] group-hover:top-4 ">
          <button className="px-4 py-2 rounded-md bg-white border">Free!</button>
        </div>
        <div className="flex justify-between  items-center absolute left-4 right-4 transition-all duration-300 bottom-[-100%] group-hover:bottom-4 ">
          <aside className="flex gap-3 items-center">
            <a
              className="flex justify-center items-center w-10 h-10 p-2 text-xl bg-white rounded-full border"
              href={url}
              target="_blank">
              <FontAwesomeIcon icon={faUser} />
            </a>
            <h3 className="text-lg font-bold text-white select-text drop-shadow">{artistName}</h3>
          </aside>
        </div>
      </main>
    </article>
  );
};

export default Item;
