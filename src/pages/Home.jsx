import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { PostCard } from '../components/BlogPost';
import { useSelector } from 'react-redux';
import { Spinner } from '../components';
import { Link } from 'react-router-dom';
import { NoPost } from '../components';


function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner heightVH={'75vh'} />
  }

  if (posts.length === 0 && !status) {
    return (
        <section className="min-h-screen md:min-h-min md:mt-5 md:my-2 text-white container mx-auto px-6 py-8 flex flex-col justify-center items-center bg-sky-500 dark:bg-sky-700 lg:mx-auto lg:w-3/4 md:rounded-3xl lg:rounded-3xl">
          <div className="max-w-screen-lg mx-auto py-16 px-6 flex flex-col items-center text-center">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Platform!</h1>
            <h2 className="text-xl font-semibold mb-6 text-center">
              Discover, Connect, and Grow with Us
            </h2>
            <p className="text-xl font-light mb-8">
              Dive into a world of endless possibilities! Whether you're here to find inspiration, share your own experiences,
              or connect with like-minded individuals, we're excited to have you. Sign up to become part of our community or
              log in if you already have an account. </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to='/login' className="w-full sm:w-auto px-8 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition dark:bg-blue-700 dark:hover:bg-blue-800">
                Login
              </Link>
              <Link to='/signup' className="w-full sm:w-auto px-8 py-3 text-white bg-green-500 hover:bg-green-600 rounded-md shadow-md transition dark:bg-green-700 dark:hover:bg-green-800">
                Sign Up
              </Link>
            </div>
          </div>
          
        </section>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {posts.length === 0 && status ? (
        <div className="flex items-center justify-center min-h-screen md:min-h-[50vh] md:mt-5">
          <NoPost  
            ImgClassName={"w-3/4 max-w-md md:max-w-sm mx-auto md:bg-white dark:md:bg-slate-500 bg-opacity-60 rounded-full"} 
            message={'No posts to read'}
          />

          
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
