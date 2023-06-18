import React, {useEffect, useState} from 'react';
import MoviesList from './MoviesList';
import axios from 'axios';
import {MovieBasicType} from "./types";

enum APIRoutes {
    TITLE = 'sort/title',
    YEAR = 'sort/year',
    RATING = 'sort/rating',
    MOVIES = 'movies'
}

const MoviesListPage: React.FC = () => {
    const [movies, setMovies] = useState<MovieBasicType[]>([]);
    const [sortType, setSortType] = useState(APIRoutes.MOVIES);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL = "http://localhost:5000/" + sortType;
                const response = await axios.get(URL);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[sortType]);

    return (
        <div className="mx-14">
            <div className="flex space-x-4 my-6">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={ () => {setSortType(APIRoutes.TITLE)} }
                >
                    Sort By Title
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={ () => {setSortType(APIRoutes.RATING)} }
                >
                    Sort By Rating
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={ () => {setSortType(APIRoutes.YEAR)} }
                >
                    Sort By Year
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={ () => {setSortType(APIRoutes.MOVIES)} }
                >
                    Clear Sorting
                </button>
            </div>
            <MoviesList movies={movies} />
        </div>
    );
};

export default MoviesListPage;
