import { useEffect, useState } from 'react';
import axios from 'axios';

// maybe add user name?
type Props = {
    id : string;
};

type Rating = {
    username : string;
    movie_id : number;
    rating : number;
};

const RatingDisplay = ({ id } : Props) => {
    const [rating, setRating] = useState('');
    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(e.target.value);
    };
    const username = 'NewUser1'
    const [ratingData, setRatingData] = useState<Comment[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/comment_display/' + id + '/5'); // Replace with your backend API endpoint
                console.log(response.data);
                setRatingData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const config = {
            method: 'post',
            url: 'http://localhost:5000/comment',
            headers: {
                'Content-Type': 'application/json'
            },
            data : {
                "name": username,
                "movie_id": id,
                "rate": rating
            }
        };
        const response = await axios(config)
        if (response.data.status === 200) {
            alert("Success!");
            const response = await axios.get('http://localhost:5000/comment_display/' + id + '5');
            setRatingData(response.data);
        } else {
            alert(response.data.message);
        }
        setRating('');
    };
    return (
        <div className="bg-gray-100">
            <div className="max-w-xl mx-auto p-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <form onSubmit={handleSubmit} className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Enter your thoughts..."
                                value={rating}
                                onChange={handleRatingChange}
                                className="flex-grow border border-gray-300 px-4 py-2 rounded-md"
                            />
                            <button
                                type="submit"
                                className="bg-gray-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            >
                                Post
                            </button>
                        </form>
                        <div className="">
                            <h2 className="text-lg font-bold mb-2 mt-4"> Comments </h2>
                            <ul className="flex flex-col divide-y">
                                {ratingData.map((item, index) => (
                                    <li
                                        key={index}
                                        className="py-2"
                                    >
                                        <h2 className="mb-2">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-700 mb-2">
                                            {item.comment}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingDisplay;