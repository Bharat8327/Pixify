import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-red-100 to-red-200 px-6 py-12 dark:from-gray-900 dark:to-gray-800 text-center">
      <h1 className="text-[10rem] font-extrabold text-red-600 dark:text-red-400 animate-pulse mb-8 select-none">
        404
      </h1>
      <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="inline-block bg-red-600 hover:bg-red-700 active:bg-red-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-700 focus:outline-none text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
      >
        Go Back Home
      </button>
      <div className="mt-12">
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          You can also try checking the URL or visit our homepage for the latest
          updates.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
