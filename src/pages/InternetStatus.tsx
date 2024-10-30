import React from "react";

const InternetStatus = () => {
    return (
        <div className="flex justify-center flex-col items-center h-[100vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="text-red-500 text-4xl h-full flex ">No Internet</div>
                <a href="/" className="bg-red-500 text-gray-300 px-4 py-2 rounded-md">
                    Reload
                </a>
            </div>
        </div>
    );
};

export default InternetStatus;
