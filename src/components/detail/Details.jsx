import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faDownload, faUser } from "@fortawesome/free-solid-svg-icons";
import pic from "../../assets/select.png";
import Loading1 from "./Loading1";
const className1 = "fixed top-0 bottom-0 right-0 left-0 bg-white p-8 z-50 transition-all overflow-auto";

import { getSrc } from "../../functions/getSrc";
import { imgSize } from "../../constant/imgSize";
import { downloadOp } from "../../functions/downloadOp";

const Details = ({ active, setActive, dataApi, id, downloadImage }) => {
  const [displayData, setDisplayData] = useState([]);
  const [size, setSize] = useState("landscape");
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const newData = dataApi.filter((item) => item.id == id);
    setDisplayData(newData);
  }, [active]);

  return (
    <div className={active + " " + className1}>
      {displayData.map((item) => (
        <li key={item.id} className="list-none w-full flex flex-col mb-20 select-none">
          <div className="flex justify-end">
            <FontAwesomeIcon
              onClick={() => setActive("displayNone")}
              icon={faClose}
              className="bg-red-600 w-4 h-4 p-2 text-3xl text-white rounded-3xl cursor-pointer transition-all duration-150 hover:bg-red-700 hover:scale-105"
            />
          </div>
          <div className=" flex flex-col justify-center items-center my-4 mb-24">
            <article className="relative">
              {!imgLoaded ? <Loading1 /> : ""}
              <img
                src={getSrc(item, size)}
                alt={`Image ${item.id}`}
                onLoad={() => setImgLoaded(true)}
                className={`${imgLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
              />
            </article>
            <div className="w-full flex flex-col gap-3">
              <p className="text-black mt-5 text-lg select-textn w-full text-left select-text">
                <span className="font-bold text-xl">Photo Descriptioin : </span>
                {item.alt == "" ? "No description" : item.alt}
              </p>
              <p className="text-xl">
                <mark className="font-bold text-xl">Note:</mark> Original Image is max size
              </p>
              {
                <>
                  <p className="text-xl">
                    <span className="font-bold text-xl">Max width :</span> {item.width}
                    px , <span className="font-bold text-xl">Max height : </span>
                    {item.height}px
                  </p>

                  <p className="text-xl">
                    <span className="font-bold text-xl">Hightest Resolution : </span>
                    {item.width + " x " + item.height} {": "}
                    {parseInt(item.width) * parseInt(item.height)}px
                  </p>
                </>
              }
            </div>
            <aside className="w-full border mt-6 p-4">
              <p>
                To download the highest quality image, select 'Original' size, wait for it to load completely, then
                click the download icon.
              </p>
              <div className="max-w-[300px]">
                <img src={pic} alt="select" className="w-full" />
              </div>
            </aside>
          </div>

          <div className="fixed bottom-0 right-0 left-0 p-8 bg-white">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex gap-3 items-center">
                <a href={item.photographer_url} target="_blank" className="rounded-full">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-xl w-6 h-6 bg-gray-300 p-3 rounded-full text-gray-600 hover:bg-gray-200"
                  />
                </a>
                <h3 className="text-xl font-bold select-text">{item.photographer}</h3>
              </div>

              <div className="flex justify-center gap-4 items-center ">
                <select
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                    setImgLoaded(false);
                  }}
                  className="border border-gray-400 py-2 pl-4 pr-2 text-lg cursor-pointer capitalize font-bold text-gray-600">
                  {imgSize.map(({ src }) => (
                    <option key={src} value={src.trim()}>
                      {src}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  onClick={() => downloadOp(downloadImage, item, size)}
                  icon={faDownload}
                  title="Download"
                  className="text-xl w-6 h-6 bg-gray-300 p-3 rounded-md text-gray-600 cursor-pointer hover:bg-gray-200 active:text-orange-400"
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default Details;
