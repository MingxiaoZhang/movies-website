import { useEffect, useState } from 'react';
import axios from 'axios';

type Movie = {
    title: string;
    year: string;
    genre: string;
};

const MoviesDisplay = () => {
    const [moviesData, setMoviesData] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/moviedata'); // Replace with your backend API endpoint
                console.log(response.data);
                setMoviesData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Data List</h1>
            <ul>
                {moviesData.map((item, index) => (
                    <a
                        key={index}
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            {item.title}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;</span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            <strong>Year:</strong> {item.year} <strong>Genre:</strong>{item.genre}
                        </p>
                    </a>
                ))}
            </ul>
        </div>
    );
};

export default MoviesDisplay;
