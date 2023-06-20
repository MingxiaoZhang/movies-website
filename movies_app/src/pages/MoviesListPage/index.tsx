import React, {useEffect, useState} from 'react';
import {TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown} from "react-icons/ti"
import MoviesList from './MoviesList';
import axios from 'axios';
import {MovieBasicType} from "./types";

export enum APIRoutes {
    TITLE_ASC = 'sort/title/asc',
    TITLE_DESC = 'sort/title/desc',
    YEAR_ASC = 'sort/year/asc',
    YEAR_DESC = 'sort/year/desc',
    RATING_ASC = 'sort/rating/asc',
    RATING_DESC = 'sort/rating/desc',
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
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={ () => {if (sortType === APIRoutes.TITLE_ASC) {
                        setSortType(APIRoutes.TITLE_DESC)
                    } else {
                        setSortType(APIRoutes.TITLE_ASC)
                    }} }
                >
                    Sort By Title
                    {
                        sortType === APIRoutes.TITLE_DESC? (
                            <TiArrowSortedDown/>
                        ) : sortType === APIRoutes.TITLE_ASC? (
                            <TiArrowSortedUp/>
                        ) : (
                            <TiArrowUnsorted/>
                        )
                    }
                </button>
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={ () => {if (sortType === APIRoutes.RATING_ASC) {
                        setSortType(APIRoutes.RATING_DESC)
                    } else {
                        setSortType(APIRoutes.RATING_ASC)
                    }} }
                >
                    Sort By Rating
                    {
                        sortType === APIRoutes.RATING_DESC? (
                            <TiArrowSortedDown/>
                        ) : sortType === APIRoutes.RATING_ASC? (
                            <TiArrowSortedUp/>
                        ) : (
                            <TiArrowUnsorted/>
                        )
                    }
                </button>
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                    onClick={ () => {if (sortType === APIRoutes.YEAR_ASC) {
                        setSortType(APIRoutes.YEAR_DESC)
                    } else {
                        setSortType(APIRoutes.YEAR_ASC)
                    }} }
                >
                    Sort By Year
                    {
                        sortType === APIRoutes.YEAR_DESC? (
                            <TiArrowSortedDown/>
                        ) : sortType === APIRoutes.YEAR_ASC? (
                            <TiArrowSortedUp/>
                        ) : (
                            <TiArrowUnsorted/>
                        )
                    }
                </button>
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
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
