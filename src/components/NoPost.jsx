import React from 'react'
import { Link } from 'react-router-dom';

function NoPost({
    className,
    ImgClassName,
    message
}) {
    return (
        <div className={`${className} flex flex-col justify-center items-center text-center`}>
            <img
                src="/images/no_posts.png"
                alt="No posts available"
                className={`${ImgClassName}`}
            />
            <h1 className="text-xl text-center font-bold font-mono mt-8">
                {message}
            </h1>
            <Link
                to="/add-post"
                className="my-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                aria-label="Create a new post"
            >
                Create Post Now
            </Link>
        </div>
    )
}

export default NoPost