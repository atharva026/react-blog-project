import React, { useState, useEffect, useCallback } from 'react';
import appwriteService from '../../appwrite/config';
import { useNavigate } from "react-router-dom";
import { Button } from '../buttons/index';
import { Input, RTE, Select } from "../index";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    // State for image preview
    const [imagePreview, setImagePreview] = useState(post ? appwriteService.getFilePreview(post.img_url) : null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate a local URL for the new image preview
        }
    };

    const submit = async (data) => {
        try {
            // console.log("Submit function called with data:", data); // Debugging log

            // Checking if an image is provided when adding a new post
            if (!post && (!data.image || !data.image[0])) {
                // console.log("No image provided for a new post."); // Debugging log
                Swal.fire({
                    icon: 'warning',
                    title: 'No Image Provided',
                    text: 'Please select an image for the post.',
                    confirmButtonText: 'OK'
                });
                return; // Stop the function if no image is provided
            }

            let file = null;
            if (data.image && data.image[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
            }

            if (post) {
                if (file) {
                    const response = await appwriteService.deleteFile(post.img_url);
                    if (!response) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Something Went Wrong',
                            text: 'Try again later.',
                            confirmButtonText: 'OK'
                        });
                        return;
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    img_url: file ? file.$id : post.img_url,
                });

                if (dbPost) {
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'success',
                        title: 'Post Updated Successfully!',
                        showConfirmButton: false,
                        timer: 3000, // Auto-close after 3 seconds
                        timerProgressBar: true,
                        toast: true, // Toast style
                        background: '#f0f9ff', // Optional background color
                        customClass: {
                            popup: 'swal2-toast-class', // Custom class for styling
                        },
                    });
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (file) {
                    const fileId = file.$id;
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        img_url: fileId,
                        userId: userData.$id,
                        username: userData.name
                    });

                    if (dbPost.success) {
                        Swal.fire({
                            position: 'bottom-end',
                            icon: 'success',
                            title: 'Post Created Successfully!',
                            showConfirmButton: false,
                            timer: 3000, // Auto-close after 3 seconds
                            timerProgressBar: true,
                            toast: true, // Toast style
                            background: '#f0f9ff', // Optional background color
                            customClass: {
                                popup: 'swal2-toast-class', // Custom class for styling
                            },
                        });
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);

            Swal.fire({
                icon: 'error',
                title: 'Submission Error',
                text: 'There was an error submitting the post. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };


    const slugTransform = useCallback((value) => {
        return (value && typeof value === "string") ? value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });


        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap sm:flex-row space-y-4 sm:space-y-0 p-5 lg:p-5 bg-white dark:text-white dark:bg-gray-800 bg-opacity-80 "
        >
            <div className="w-full sm:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    {...register("title", {
                        required: "Title is required",
                        minLength: {
                            value: 5,
                            message: "Title must be at least 5 characters long", // Custom error message
                        },
                        maxLength: {
                            value: 100,
                            message: "Title cannot exceed 100 characters", // Custom error message
                        },
                    })}
                />

                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                {/* Only for Post create : slug */}
                {/* {!post && (
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4 w-full hover:cursor-not-allowed text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                        {...register("slug", { required: true })}
                        onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
                        readOnly
                    />
                )} */}

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-full sm:w-1/3 px-2 space-y-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                    onChange={handleImageChange}
                />

                {/* Show only for Post Edit */}
                {/* {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.img_url)}
                            alt={post.title}
                            className="rounded-lg object-contain w-full h-48 sm:h-36"
                        />
                    </div>
                )} */}
                {imagePreview && (
                    <div className="w-full mb-4 bg-black bg-opacity-40 rounded-xl shadow-lg">
                        <img
                            src={imagePreview}
                            alt={post?.title || 'Preview'}
                            className="rounded-lg object-contain w-full h-48 sm:h-36"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                    className="w-1/3 sm:w-2/5 md:w-24 lg:w-1/3 mx-2 rounded-lg"
                >
                    {post ? "Update" : "Submit"}
                </Button>

                <Button
                    type='button'
                    bgColor={post ? "bg-blue-500" : "bg-green-500"}
                    className="w-1/3 sm:w-2/5 md:w-24 lg:w-1/3 mx-2 rounded-lg"
                >
                    <Link to={post ? `/post/${post.$id}` : '/my-posts'}>
                        {post ? "Discard" : "Return"}
                    </Link>
                </Button>
            </div>
        </form>

    );
}

export default PostForm;