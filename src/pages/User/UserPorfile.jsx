import React, { useState, useEffect } from 'react'
import userService from '../../appwrite/user';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components';
import AllPost from '../BlogPost/MyPost';

function UserPorfile() {

    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.getUserById(userId).then(fetchedUser => {
            setUser(fetchedUser);
        });
    }, [userId]); // Adding userId as a dependency to re-run when userId changes

    if (!user) {
        return <Spinner heightVH={'75vh'} ></Spinner>
    }

    return (
        <>
            <div className="mx-auto mt-8 w-full max-w-xs sm:max-w-sm lg:max-w-md h-80 group overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-700 flex flex-col items-center justify-center text-center shadow-md">
                {/* <!-- Profile Banner --> */}
                <div className="w-full h-44 sm:h-32 md:h-40 lg:h-44 rounded-2xl overflow-hidden border-b-4 border-gray-900 dark:border-cyan-500">
                    <img src="/images/profile_banner.jpg" className="w-full h-full object-cover" />
                </div>

                {/* <!-- Profile Image with hover transformation --> */}
                <img src="/images/nav_logo.png" alt="Profile Logo"
                    className="w-24 h-24 sm:h-28 mt-10 rounded-full border-4 border-gray-900 dark:border-cyan-500 bg-slate-300 translate-x-20 md:translate-x-0 -translate-y-20 " />

                <div className="-translate-y-10 w-2/3 text-ellipsis whitespace-nowrap text-xl sm:text-2xl md:text-4xl font-semibold text-black dark:text-white">
                    {user ? (user.name ? user.name : 'Not available') : 'Loading...'}
                </div>
            </div>


            {/* Gradient Partition Before All Posts */}
            <hr className="border-0 h-2 w-3/4 mx-auto my-8 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full" />


            <AllPost
                userId={userId}
                NoPostStyle={{
                    NoPostClass: 'min-h-1/2 md:min-h-[5vh] md:my-4',
                    NoPostImgClass: "w-2/4 max-w-md md:max-w-36 mx-auto md:bg-white dark:md:bg-slate-500 bg-opacity-60 rounded-full"
                }}
            />
        </>
    )
}

export default UserPorfile