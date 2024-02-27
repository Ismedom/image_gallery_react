import React, { useEffect, useState } from "react";
import Item from "./list item/Item";
import Loading from "./Loading";
import NotFound from "./NotFound";
import NoInternet from "./list item/NoInternet";

const ListItem = ({
  currentPages,
  api,
  searchValue,
  IsAllow,
  setActive,
  setDataApi,
  setId,
}) => {
  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const key = "FVFzMMNPCg7dTdsg067Dhnoob0k7DBQp7BDoaDX9wEwz4Wg1RMafdYD7";

  if (!navigator.onLine) {
    return <NoInternet />;
  }
  useEffect(() => {
    if (searchValue == "" && IsAllow) return;
    setIsLoading(false);
    fetch(api, {
      headers: {
        Authorization: key,
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        setIsLoading(true);
        const allPhotos = datas.photos;
        setData(allPhotos);
        setDataApi(allPhotos);
      });
  }, [currentPages, api]);
  function handle(e) {
    setActive("active");
    setId(e.currentTarget.id);
  }

  if (!IsLoading) {
    return <Loading />;
  }
  return (
    <div className={data.length == 0 ? "w-full" : "w-full container1 mx-auto "}>
      {data.length == 0 ? (
        <NotFound />
      ) : (
        data.map((item) => (
          <li
            className="list-none my-4"
            key={item.id}
            id={item.id}
            onClick={(e) => handle(e)}>
            <Item
              imgSrc={item.src.large}
              artistName={item.photographer}
              url={item.photographer_url}
              id={item.id}
            />
          </li>
        ))
      )}
    </div>
  );
};

export default ListItem;
