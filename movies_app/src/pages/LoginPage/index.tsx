import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here
        console.log(`Username: ${username} | Password: ${password}`);
        // Reset form fields
        setUsername('');
        setPassword('');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="border border-gray-300 px-4 py-2 rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="border border-gray-300 px-4 py-2 rounded-md"
                />
                <button
                    type="submit"
                    className="bg-gray-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    Sign In
                </button>
            </form>
            <p>
                Don't have an account?{' '}
                <button onClick={() => navigate('/register')}>
                    Register
                </button>
            </p>
        </div>
    );
};

export default LoginPage
