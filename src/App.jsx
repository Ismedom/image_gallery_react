import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ListItem from "./components/items/ListItem";
import MoreButtton from "./components/buttons/MoreButtton";
import Details from "./components/detail/Details";
import downloadImage from "./functions/download";

const App = () => {
  const [currentPages, setCurrentPages] = useState(20);
  const [pages, setPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [IsAllow, setIsAllow] = useState(false);
  const [active, setActive] = useState("displayNone");
  const [dataApi, setDataApi] = useState([]);
  const [id, setId] = useState("");

  function change() {
    setIsAllow(true);
    setApi(api2);
  }

  // public api from google pixel
  const api2 = `https://api.pexels.com/v1/search?query=${searchValue.toLocaleLowerCase()}&page=${pages}&per_page=${currentPages}`;
  const api1 = `https://api.pexels.com/v1/curated?page=${pages}&per_page=${currentPages}`;

  const [api, setApi] = useState("https://api.pexels.com/v1/curated?page=1&per_page=15");

  useEffect(() => {
    !IsAllow ? setApi(api1) : setApi(api2);
  }, [api1]);

  const addNumber = () => setCurrentPages((pre) => pre + 10);

  return (
    <div className={active == "active" ? "overflow-hidden" : "w-full overflow-scroll h-screen"}>
      <div className="w-full fixed z-40 bg-white flex flex-wrap ">
        <Header {...{ searchValue, setSearchValue, change }} />
      </div>

      <div className="mt-32  flex justify-center items-center">
        <ListItem {...{ currentPages, api, searchValue, IsAllow, setActive, setDataApi, setId }} />
      </div>
      <MoreButtton {...{ func: addNumber, dataApi }} />
      <Details {...{ active, setActive, api, dataApi, id, downloadImage }} />
    </div>
  );
};

export default App;
