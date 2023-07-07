import React, { useState } from 'react';

type SearchBarProps = {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="flex items-center w-full">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                onClick={handleSearch}
                className="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
