import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";
import ImageModal from "../components/ImageModal";
import SearchBar from "../components/SearchBar";
import { contextInfor } from "../provider/Provider";
import NotFound from "./NotFound";
import Spinner from "../components/loading/Spinner";
const API_KEY = import.meta.env.VITE_API_KEY;

const ImageGallery = () => {
    const { images, setImages, imageId } = useContext(contextInfor);
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [perPage] = useState(15);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [errors, setErrors] = useState([]);

    const fetchImages = useCallback(
        async (searchTerm, resetPage = false) => {
            if (loading || (!hasMore && !resetPage)) return;

            setLoading(true);
            const currentPage = resetPage ? 1 : page;
            const api = searchTerm
                ? `https://api.pexels.com/v1/search?query=${searchTerm.toLowerCase()}&page=${currentPage}&per_page=${perPage}`
                : `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;

            try {
                const response = await axios.get(api, {
                    headers: {
                        Authorization: API_KEY,
                    },
                });
                const newImages = response.data.photos;
                setImages((prevImages) => {
                    if (resetPage) {
                        return newImages;
                    }
                    const uniqueNewImages = newImages.filter(
                        (newImg) => !prevImages.some((prevImg) => prevImg.id === newImg.id)
                    );
                    return [...prevImages, ...uniqueNewImages];
                });
                setHasMore(newImages.length === perPage);
                setPage((prevPage) => (resetPage ? 2 : prevPage + 1));
            } catch (error) {
                setErrors(error);
            } finally {
                setLoading(false);
            }
        },
        [page, perPage, loading, hasMore]
    );

    useEffect(() => {
        fetchImages(searchValue);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) return;
        setImages([]);
        setPage(1);
        setHasMore(true);
        fetchImages(searchValue, true);
    };

    const toggleFavorite = useCallback((image) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((fav) => fav.id === image.id);
            if (isFavorite) {
                return prevFavorites.filter((fav) => fav.id !== image.id);
            } else {
                return [...prevFavorites, image];
            }
        });
    }, []);

    return (
        <>
            <div className="container flex flex-wrap md:items-center gap-1 md:gap-6 md:flex-nowrap mx-auto p-4 my-4 sticky top-0 z-[100] bg-white">
                <a
                    href="/"
                    className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-t from-purple-600 to-blue-500 bg-clip-text">
                    IMG Gallery
                </a>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />
            </div>
            <div className="container mx-auto p-4">
                {searchValue && images.length == 0 && !loading ? (
                    <NotFound />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <ImageCard
                                id={image.id}
                                key={`${image.id}-${image.photographer}`}
                                image={image}
                                toggleFavorite={toggleFavorite}
                                favorites={favorites}
                            />
                        ))}
                    </div>
                )}

                <div className="flex justify-center ">
                    {hasMore && (
                        <div className="mb-6">
                            {loading ? (
                                <div className="my-4">
                                    <Spinner />
                                </div>
                            ) : (
                                <button
                                    onClick={() => fetchImages(searchValue)}
                                    disabled={loading}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400">
                                    see more
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {imageId != 0 && <ImageModal toggleFavorite={toggleFavorite} favorites={favorites} />}
        </>
    );
};

export default ImageGallery;
