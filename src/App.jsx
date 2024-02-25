import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import ListItem from "./component/ListItem";
import MoreButtton from "./component/MoreBottom/MoreButtton";
import Details from "./component/detail/Details";

const App = () => {
  const [currentPages, setCurrentPages] = useState(15);
  const [pages, setPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [IsAllow, setIsAllow] = useState(false);
  const [active, setActive] = useState("displayNone");
  const [dataApi, setDataApi] = useState([]);
  const [id, setId] = useState("");

  function downloadImage(imageUrl, filename) {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }

  function change() {
    setIsAllow(true);
    setApi(api2);
  }
  const api2 = `https://api.pexels.com/v1/search?query=${searchValue.toLocaleLowerCase()}&page=${pages}&per_page=${currentPages}`;
  const api1 = `https://api.pexels.com/v1/curated?page=${pages}&per_page=${currentPages}`;

  const [api, setApi] = useState(
    "https://api.pexels.com/v1/curated?page=1&per_page=15"
  );

  useEffect(() => {
    if (!IsAllow) setApi(api1);
    else setApi(api2);
  }, [api1]);

  function addNumber() {
    setCurrentPages((pre) => pre + 10);
  }
  return (
    <div
      className={
        active == "active"
          ? "overflow-hidden"
          : "w-full overflow-scroll h-screen"
      }>
      <div className="w-full fixed z-40 bg-white flex flex-wrap ">
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          change={change}
        />
      </div>

      <div className="mt-32  flex justify-center items-center">
        <ListItem
          currentPages={currentPages}
          api={api}
          searchValue={searchValue}
          IsAllow={IsAllow}
          setActive={setActive}
          setDataApi={setDataApi}
          setId={setId}
        />
      </div>
      <MoreButtton func={addNumber} dataApi={dataApi} />
      <Details
        active={active}
        setActive={setActive}
        api={api}
        dataApi={dataApi}
        id={id}
        downloadImage={downloadImage}
      />
    </div>
  );
};

export default App;
