import React, { useEffect, useState } from "react";

const useFetchImage = ({ currentPages, api, searchValue, IsAllow, setDataApi, setIsLoading, setData, key }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchValue === "" && IsAllow) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(api, {
          headers: {
            Authorization: key,
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const datas = await response.json();
        const allPhotos = datas.photos || [];
        setData(allPhotos);
        setDataApi(allPhotos);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPages, api, IsAllow, setDataApi, key]);

  return error;
};

export default useFetchImage;
