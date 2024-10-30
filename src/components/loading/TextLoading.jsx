import React from "react";

const TextLoading = () => {
    return (
        <div className="flex max-w-max items-center">
            Loading
            <div>
                <span style={{ animationDelay: "1s" }} className="animate-ping ">
                    .
                </span>
                <span style={{ animationDelay: "0.5" }} className="animate-ping ">
                    .
                </span>
                <span style={{ animationDelay: ".125s" }} className="animate-ping ">
                    .
                </span>
            </div>
        </div>
    );
};

export default TextLoading;
