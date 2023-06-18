import { useEffect, useState } from 'react';
import axios from 'axios';
import {MovieInfoType} from "./types";

type Props = {
    id: string
};

const BasicInfo = ({ id }: Props) => {
    const [movieInfo, setMovieInfo] = useState<MovieInfoType>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/moviedata/${id}`); // Replace with your backend API endpoint
                setMovieInfo(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="bg-gray-100">
            <div className="max-w-xl mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold mb-2">{movieInfo?.title}</h1>
                        <p className="text-gray-700 mb-4">Year: {movieInfo?.year}</p>
                        <p className="text-gray-700 mb-4">Runtime: {movieInfo?.runtime}</p>
                        <p className="text-gray-700 mb-4">Director: {movieInfo?.director}</p>
                        <p className="text-gray-700 mb-4">Genres: {
                            movieInfo?.genres && movieInfo.genres.map((genre, index) => (
                                <span key={index}>{genre} </span>
                            ))
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInfo;
