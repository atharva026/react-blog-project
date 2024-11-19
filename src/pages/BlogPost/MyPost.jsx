import React, { useEffect, useState } from 'react';
import { PostCard } from '../../components/BlogPost';
import appwriteService from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { Spinner } from '../../components';
import { NoPost } from '../../components';

function MyPost({ 
    userId = null,
    NoPostStyle=null 
}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userID = userId ? userId : userData.$id
                const response = await appwriteService.getAllUserPosts(userID);
                if (response) {
                    setPosts(response.documents);
                }
            } catch (err) {
                setError('Error fetching posts');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userData?.$id) {
            fetchPosts();
        }
    }, [userData, userId]);

    if (loading) {
        return <Spinner heightVH={'75vh'} />;
    }

    if (error) {
        return <div className="text-center py-8 text-xl text-red-500 font-mono">{error}</div>;
    }

    return (
        <>
            {posts.length > 0 ? (
                <div className="w-full mx-auto py-8 px-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <NoPost 
                    className={NoPostStyle?.NoPostClass || 'min-h-screen md:min-h-[50vh] md:mt-5'} 
                    ImgClassName={NoPostStyle?.NoPostImgClass || 'w-3/4 max-w-md md:max-w-sm mx-auto md:bg-white dark:md:bg-slate-500 bg-opacity-60 rounded-full'}
                    message={'No Post Available'}
                />
            )}
        </>
    );
}

export default MyPost;

