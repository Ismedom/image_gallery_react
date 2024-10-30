import React from "react";
import ImageGallery from "./pages/ImgGallery";
import Provider from "./provider/Provider";
import useInternet from "./hook/UseInternet";
import InternetStatus from "./pages/InternetStatus";

const App = () => {
    const isOnline = useInternet();
    return (
        <Provider>
            {isOnline ? (
                <div className="max-w-full lg:max-w-[80%] mx-auto">
                    <ImageGallery />
                </div>
            ) : (
                <InternetStatus />
            )}
        </Provider>
    );
};

export default App;
