import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="max-w-screen-xl mx-auto lg:my-12 p-8 bg-slate-100 dark:bg-gray-800 lg:rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">About BlogBox</h1>
            <hr className="border-0 h-1 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full" />
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                BlogBox is a versatile blogging platform designed to help you create, share, and discover meaningful content effortlessly. Whether you're a writer, reader, or both, BlogBox makes it simple to stay connected with topics that matter to you.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">How It Works</h2>
            <hr className="border-0 w-48 h-1 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full" />
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-4">
                <li><strong>Create and Share Posts:</strong> Sign up to start creating posts. Easily draft, edit, and publish your content in a user-friendly interface.</li>
                <li><strong>Explore Content:</strong> Browse through a wide range of blog posts across various categories and discover new perspectives.</li>
            </ul>
                

            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-2">Key Features</h2>
            <hr className="border-0 w-44 h-1 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full" />
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-4">
                <li><strong>Content Creation:</strong> Use the full-featured editor to format text, add images, and structure your posts for easy reading.</li>
                <li><strong>Responsive Design:</strong> Built with React and Tailwind CSS, BlogBox adapts seamlessly to any screen size for an optimal reading experience.</li>
                <li><strong>Dark Mode:</strong> Switch between light and dark modes for a personalized experience.</li>
            </ul>

            <p className="text-lg text-gray-700 dark:text-gray-300 mt-8">
                BlogBox is the perfect platform for bloggers, readers, and content enthusiasts who want to engage in a vibrant community. Start exploring and sharing today!
            </p>
            <div className="flex justify-center mt-8">
                <Link to="/" className="px-8 py-3 bg-purple-500 text-white font-bold rounded-md shadow-md hover:bg-purple-600 dark:hover:bg-purple-700 transition duration-300">
                    Start Using BlogBox
                </Link>
            </div>
        </div>
    );
}

export default About;
