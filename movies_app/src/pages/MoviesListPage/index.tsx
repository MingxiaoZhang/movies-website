import React, {useEffect, useState} from 'react';
import MoviesList from './MoviesList';
import axios from 'axios';
import {MovieBasicType} from "./types";

const MoviesListPage: React.FC = () => {
    const [movies, setMovies] = useState<MovieBasicType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/movies`); // Replace with your backend API endpoint
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <MoviesList movies={movies} />
        </div>
    );
};

export default MoviesListPage;
