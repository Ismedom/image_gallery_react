import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchValue, setSearchValue, handleSearch }) => {
    return (
        <form onSubmit={handleSearch} className="mb-4 max-w-[600px] flex-1">
            <div className="flex rounded-2xl overflow-hidden border border-blue-200">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search for images..."
                    className="flex-grow p-2 px-4 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-800"
                />
                <button
                    title="Press Enter to search!"
                    type="submit"
                    className="bg-blue-500 text-white p-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <Search size={24} />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
