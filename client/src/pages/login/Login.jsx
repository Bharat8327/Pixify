import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosClients from "../../utils/axiosClients";
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axiosClients.post('/auth/login', {
                email,
                password
            });
            setItem(KEY_ACCESS_TOKEN, result.accessToken);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email"
                            id="email"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwd" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password"
                            id="passwd"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Submit" onSubmit={handleSubmit} className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    <p className='text-center'>Do no have an account ? <Link to="/signup" className='text-gray-700'>Sign Up</Link></p>
                </form>
            </div>
        </div>

    )
}

export default Login;