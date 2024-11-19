import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button } from "../../components/buttons";
import parse from 'html-react-parser';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.img_url);
        Swal.fire({
          position: 'bottom-end',
          icon:  'success',
          title: 'Post Deleted Successfully!',
          showConfirmButton: false,
          timer: 3000, // Auto-close after 3 seconds
          timerProgressBar: true,
          toast: true, // Toast style
          background: '#f0f9ff', // Optional background color
          customClass: {
            popup: 'swal2-toast-class', // Custom class for styling
          },
        });
        navigate("/my-posts");
      }
    });
  };

  const fomatedDate = (postDate) => {
    const date = new Date(postDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return post ? (
    <div className="py-8 px-4 md:px-8 lg:px-16 max-h-full">
      <div className="rounded-lg overflow-hidden shadow-lg w-full max-w-full">
        {/* Image Section */}
        <div className="overflow-hidden">
          <img
            src={appwriteService.getFilePreview(post.img_url)}
            alt={post.title}
            className="rounded-t-lg bg-gray-300  object-contain w-full h-48 sm:h-64 md:h-80 lg:h-96"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-b-lg">
          {/* Header with status and edit/delete buttons */}
          <div className="flex justify-between items-center mb-4">
            {/* Status Tag */}
            <span
              className={`inline-block text-sm font-semibold px-2 py-1 rounded-full ${post.status === 'active'
                ? 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100'
                : 'bg-orange-200 text-orange-800 dark:bg-orange-600 dark:text-orange-100'
                }`}
            >
              {post.status}
            </span>

            {/* Edit/Delete Buttons (Only visible if the user is the author) */}
            {isAuthor && (
              <div className="flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500 dark:bg-green-600" className="text-xs sm:text-sm rounded-full">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500 dark:bg-red-600"
                  onClick={deletePost}
                  className="text-xs sm:text-sm rounded-full"
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            )}
          </div>
          <hr className="border-0.5 h-0.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 rounded-full" />


          {/* Title and Date */}
          <h2 className="text-gray-900 dark:text-gray-100 text-3xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">
            By <Link className="underline underline-offset-2 text-blue-600 dark:text-blue-500" to={`/user/${post.userId}`}>{post.username}</Link> on {post.$createdAt ? fomatedDate(post.$createdAt) : undefined}
          </p>

          {/* Content */}
          <div className="p-4 md:p-10 bg-slate-100 dark:bg-gray-600 rounded-md prose prose-sm sm:prose lg:prose-lg xl:prose-xl xl:max-w-full dark:prose-invert break-words whitespace-pre-wrap">
            {post.content ? parse(post.content) : <p>No content available.</p>}
          </div>

        </div>
      </div>
    </div>
  ) : null;
}
