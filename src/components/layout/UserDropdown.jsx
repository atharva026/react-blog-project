import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserDropdown({
    setUserDropDownFalse,
    showAlertForLogout,
    position = 'right-0 top-12 font-sans w-full min-w-[8rem]', // Default position
}) {

    const userData = useSelector(state => state.auth.userData)

    return (
        <ul className={`absolute ${position} flex-col rounded-md border border-gray-200 bg-white shadow-lg py-2 z-50 transition-all duration-200 ease-in-out`}>
            <li className=" text-center">
                <div className="flex flex-col px-4 py-2">
                    <Link to={`/user/${userData.$id}`}
                        onClick={setUserDropDownFalse}
                    >
                        <span className="text-sm font-medium text-neutral-900 break-words">
                            {userData.name}
                        </span>
                        <p className="text-xs text-neutral-600 break-words">
                            {userData.email}
                        </p>
                    </Link>
                </div>
            </li>
            <hr className="my-1 border-gray-300" />

            <li>
                <Link
                    className="block px-4 py-2 text-sm text-gray-700 text-center hover:bg-gray-100 transition-colors duration-200 ease-in-out rounded-t-md"
                    to="/add-post"
                    onClick={setUserDropDownFalse}
                >
                    Add Post
                </Link>
            </li>
            <hr className="my-1 border-gray-300" />

            <li>
                <Link
                    className="block px-4 py-2 text-sm text-gray-700 text-center hover:bg-gray-100 transition-colors duration-200 ease-in-out rounded-t-md"
                    to="/my-posts"
                    onClick={setUserDropDownFalse}

                >
                    My Blogs
                </Link>
            </li>
            <hr className="my-1 border-gray-300" />
            <li>
                <button onClick={showAlertForLogout} className='w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 ease-in-out rounded-b-md' >
                    Logout
                </button>
            </li>
        </ul>
    );
}

export default UserDropdown;


// small /mobile : right-2/4 top-12 font-sans w-1/4 min-w-[8rem]
// lg/md : right-0 top-12 font-sans w-full min-w-[11rem]