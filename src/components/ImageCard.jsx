import React, { useContext } from "react";
import { Heart, Download } from "lucide-react";
import downloadImage from "../functions/Download";
import { contextInfor } from "../provider/Provider";

const ImageCard = ({ id, image, toggleFavorite, favorites }) => {
    const { setImageId } = useContext(contextInfor);

    return (
        <div className="relative group cursor-pointer">
            <div
                id={id}
                onClick={(e) => {
                    setImageId(e.currentTarget.id);
                }}
                className="absolute inset-0 sm:bg-black sm:opacity-50 sm:hidden sm:group-hover:block"></div>
            <img
                id={id}
                src={image.src.medium}
                alt={image.photographer}
                className="w-full h-64 object-cover rounded-md cursor-pointer"
            />
            <div className="absolute px-2 py-1 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                    onClick={() => toggleFavorite(image)}
                    className="text-white mr-2 hover:text-red-500 focus:outline-none">
                    <Heart fill={favorites.some((fav) => fav.id === image.id) ? "red" : "none"} size={24} />
                </button>
                <button
                    onClick={() => downloadImage(image.src.original, `${image.photographer}.jpg`)}
                    className="text-white hover:text-blue-500 focus:outline-none">
                    <Download size={24} />
                </button>
            </div>
        </div>
    );
};

export default ImageCard;
