import React, { useEffect } from "react";

const useFetchImage = ({ currentPages, api, searchValue, IsAllow, setDataApi, setIsLoading, setData, key }) => {
  useEffect(() => {
    if (searchValue === "" && IsAllow) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api, {
          headers: {
            Authorization: key,
          },
        });
        const datas = await response.json();
        const allPhotos = datas.photos || [];
        setData(allPhotos);
        setDataApi(allPhotos);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPages, api, IsAllow, setDataApi]);

  return;
};

export default useFetchImage;
