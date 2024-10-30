import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center text-2xl h-full font-[500]">
            Your Search was not Found!
            <a href="/" className="bg-red-600 hover:bg-red-700 px-3 py-1 text-[18px] rounded-md text-gray-200">
                Reload
            </a>
        </div>
    );
};

export default NotFound;
