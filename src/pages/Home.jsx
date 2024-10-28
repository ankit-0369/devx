import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AllPost from './AllPost';

function Home() {
    const authStatus = useSelector(state => state.status);

    if (!authStatus) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="relative h-screen">
                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{ backgroundImage: 'url(https://cloud.appwrite.io/v1/storage/buckets/671f68380004c1c127c5/files/671f6bb10039f222ed41/view?project=671f65de001143dc274a&project=671f65de001143dc274a&mode=admin)' }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
                    <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight mb-6">
                            Welcome Devs!
                        </h1>
                        <p className="mt-3 text-xl sm:text-2xl text-center max-w-md sm:max-w-xl mb-8">
                            Join our community of developers. Share your knowledge, learn from others, and grow your skills.
                        </p>
                        <Link
                            to="/login"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-100 mb-6">Latest Posts</h1>
                <AllPost />
            </div>
        </div>
    );
}

export default Home;