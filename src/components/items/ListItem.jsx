import React, { useEffect, useState } from "react";
import Item from "./Item";
import Loading from "../../pages/Loading";
import NotFound from "../../pages/NotFound";
import NoInternet from "../../pages/NoInternet";
import useFetchImage from "../../hook/useFetchImage";
const key = import.meta.env.VITE_API_KEY;

const ListItem = ({ currentPages, api, searchValue, IsAllow, setActive, setDataApi, setId }) => {
  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  if (!navigator.onLine) return <NoInternet />;

  useFetchImage({
    currentPages,
    api,
    searchValue,
    IsAllow,
    setDataApi,
    setIsLoading,
    setData,
    key,
  });

  const handle = (e) => {
    setActive("active");
    setId(e.currentTarget.id);
  };

  if (IsLoading) {
    return <Loading />;
  }

  return (
    <div className={data.length === 0 ? "w-full" : "w-full container1 mx-auto "}>
      {data.length === 0 && searchValue !== "" ? (
        <NotFound />
      ) : (
        data.map((item) => (
          <li className="list-none my-4" key={item.id} id={item.id} onClick={handle}>
            <Item imgSrc={item.src.large} artistName={item.photographer} url={item.photographer_url} id={item.id} />
          </li>
        ))
      )}
    </div>
  );
};

export default ListItem;
