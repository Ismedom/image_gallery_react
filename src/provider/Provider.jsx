import { createContext, useState } from "react";
import React from "react";

export const contextInfor = createContext();

const Provider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [imageId, setImageId] = useState(0);
    const infor = { images, setImages, imageId, setImageId };

    return (
        <div>
            <contextInfor.Provider value={infor}>{children}</contextInfor.Provider>
        </div>
    );
};

export default Provider;
