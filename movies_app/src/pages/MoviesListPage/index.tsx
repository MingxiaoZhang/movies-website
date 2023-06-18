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
    const onClickSort = (type:APIRoutes) => {setSortType(type)}
    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL = "http://localhost:5000/" + sortType;
                console.log(URL);
                const response = await axios.get(URL);
                console.log(response.data);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[sortType])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5000/movies`); // Replace with your backend API endpoint
    //             setMovies(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    return (
        
        <div>
            <div className='sortMenu'>
                <button onClick={ () => {onClickSort(APIRoutes.TITLE)} } style={{margin: "10px 15px"}}>
                    Sort By Title
                </button>
                <button onClick={ () => {onClickSort(APIRoutes.RATING)} } style={{margin: "10px 15px"}}>
                    Sort By Rate
                </button>
                <button onClick={ () => {onClickSort(APIRoutes.YEAR)} } style={{margin: "10px 15px"}}>
                    Sort By Year
                </button>
                <button onClick={ () => {onClickSort(APIRoutes.MOVIES)} } style={{margin: "10px 15px"}}>
                    Clear Sorting
                </button>
            </div>
            <MoviesList movies={movies} />
        </div>
    );
};

export default MoviesListPage;
