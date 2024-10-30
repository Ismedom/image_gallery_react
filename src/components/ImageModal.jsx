//

import React, { useContext, useEffect, useState } from "react";
import { Heart, Download, X, User2Icon } from "lucide-react";
import { contextInfor } from "../provider/Provider";
import TextLoading from "./loading/TextLoading";

const ImageModal = ({ toggleFavorite, favorites }) => {
    const { images, imageId, setImageId } = useContext(contextInfor);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (imageId) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "auto";

        return () => (document.body.style.overflowY = "auto");
    }, [imageId]);

    const displayImage = images.find((item) => parseInt(item.id) === parseInt(imageId)) || {};

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]">
            <div onClick={() => setImageId(0)} className="fixed inset-0"></div>
            <div className="bg-white h-full p-4 rounded-md max-w-3xl w-full relative">
                <div className="flex justify-between mb-4 pt-2">
                    <div className="md:px-5">
                        <button
                            onClick={() => toggleFavorite(displayImage)}
                            className="mr-2 text-gray-600 hover:text-red-500 focus:outline-none">
                            <Heart
                                fill={favorites.some((fav) => fav.id === displayImage.id) ? "red" : "none"}
                                size={24}
                            />
                        </button>
                        <button
                            onClick={() =>
                                downloadImage(displayImage.src?.original, `${displayImage.photographer}.jpg`)
                            }
                            className="text-gray-600 hover:text-blue-500 focus:outline-none">
                            <Download size={24} />
                        </button>
                    </div>

                    <button
                        onClick={() => setImageId(0)}
                        className=" text-gray-500 hover:text-gray-700 focus:outline-none">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex justify-center items-center h-[calc(100%-100px)] relative">
                    {isLoading ? (
                        <div className="text-xl font-bold absolute">
                            <TextLoading />
                        </div>
                    ) : null}
                    <img
                        onLoad={() => setIsLoading(false)}
                        onLoadStart={() => setIsLoading(true)}
                        src={displayImage.src?.large}
                        alt={displayImage.alt || "Image"}
                        className="mb-4 rounded-md"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <a href={displayImage.photographer_url} target="_blank" className="flex gap-1 items-center">
                        <User2Icon className="bg-gray-500 text-white w-7 h-7 p-1 rounded-full" />
                        <h2 className="text-2xl font-[500]">{displayImage.photographer}</h2>
                    </a>
                    <p>
                        Size: {displayImage.width} x {displayImage.height}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
