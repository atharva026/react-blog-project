import React from 'react';
import appwriteService from '../../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({
    $id,
    title,
    img_url,
    status,
    $createdAt
}) {
    const placeholderUrl = "https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Image\nNot+Found";

    const dateCreated = $createdAt ? new Date($createdAt) : ''

    return (
        <div className="mx-auto mb-2 w-64 h-80 bg-white dark:bg-gray-800 rounded-3xl shadow-lg lg:hover:shadow-xl lg:transition-transform lg:hover:scale-105 lg:duration-200 lg:ease-in-out">
            <div className="dark:bg-white w-full h-1/2 rounded-t-3xl overflow-hidden flex justify-center">
                <img
                    src={img_url ? appwriteService.getFilePreview(img_url) : placeholderUrl}
                    alt={title}
                    className="object-contain w-full h-full"
                    onError={(e) => { e.target.src = placeholderUrl; }}
                />
            </div>
            <hr className="border-t border-gray-300 dark:border-gray-600" />
            <div className="p-5 flex flex-col space-y-2">
                <p className={`text-center text-sm font-medium py-1 px-2 rounded-full w-fit ${status === 'active'
                    ? 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100'
                    : 'bg-orange-200 text-orange-800 dark:bg-orange-600 dark:text-orange-100'
                    }`}>
                    {status}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">{title}</h2>
            </div>
            <div className="flex items-center justify-between px-4 pb-4 text-gray-500 dark:text-gray-400 text-sm">
                <p>{`${dateCreated.getDate()}/${dateCreated.getMonth() + 1}/${dateCreated.getFullYear()}`}</p>
                <Link
                    to={`/post/${$id}`}
                    aria-label={`View post: ${title}`}
                    className="bg-blue-100 dark:bg-blue-500 px-3 py-2 rounded-full text-blue-500 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300"
                >
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                </Link>
            </div>
        </div>

    );
}

export default PostCard;

