import React, { useState, useEffect } from 'react';
import appwriteService from '../../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { PostForm } from '../../components/BlogPost';

function EditPost() {

    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((editPost) => {
                    if (editPost) {
                        setPost(editPost)
                    }
                }
            )
        }else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='md:pt-4'>
            <PostForm post={post} />
        </div>
    ) : null
}

export default EditPost