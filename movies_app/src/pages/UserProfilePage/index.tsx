import React, { useEffect, useState } from 'react';
import { isTokenValid } from "../../utils/authenticationUtil";
import {useNavigate} from "react-router-dom";
import {PageRoutes} from "../../routes/pageRoutes";

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string>();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && isTokenValid()) {
            setUser(user);
        } else {
            localStorage.clear();
            navigate(PageRoutes.LOGIN);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate(PageRoutes.HOME);
    };

    if (!user) {
        return <p>Loading user profile...</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            {isTokenValid() ? (
                <>
                    <h1 className="text-3xl font-bold ml-10">User Profile</h1>
                    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6 mt-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Name:</label>
                            <p className="text-gray-800">{user}</p>
                        </div>
                        <button
                            className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <span>Token expired. Please login again</span>
            )}
        </div>
    );
};

export default UserProfilePage;
