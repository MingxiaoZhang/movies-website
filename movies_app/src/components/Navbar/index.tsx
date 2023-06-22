import React from 'react';
import {useNavigate} from "react-router-dom";
import {PageRoutes} from "../../routes/pageRoutes";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-white text-lg font-bold">MDB</h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => {navigate(PageRoutes.HOME)}}
                                >
                                    Home
                                </a>
                                <a
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => {navigate(PageRoutes.MOVIE_LIST)}}
                                >
                                    All Movies
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center ml-auto">
                        <button
                            onClick={() => {navigate(PageRoutes.LOGIN)}}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
