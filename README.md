# Blog Platform

A responsive blogging platform using React.js, Tailwind CSS, Redux, and Appwrite, featuring secure backend integration and user profile functionality for managing and publishing posts.

## Features

- User authentication and session management with Appwrite
- Create, edit, delete, and view blog posts
- Rich text post editor with formatted content support
- Image upload and preview support for blog posts
- Public blog feed with active posts only
- Personal post management for logged-in users
- User profile support and author-specific views
- About and contact pages
- Responsive layout with dark mode support
- Redux-based global auth state

## Technologies Used

- Frontend: React 18, Vite
- Routing: React Router DOM
- State management: Redux Toolkit, React Redux
- Styling: Tailwind CSS
- Backend / Auth: Appwrite
- Rich text editing: React Quill
- Notifications: SweetAlert2
- Form handling: React Hook Form
- Utilities: HTML React Parser

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or later
- npm
- An Appwrite project and database

## Installation

1. Clone the repository:

```bash
git clone https://github.com/atharva026/react-blog-project
cd react-blog-project
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add your Appwrite configuration:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_STORAGE_ID=your_storage_id
VITE_USER_READ_KEY=your_user_read_key
```

4. Start the development server:

```bash
npm run dev
```

The application will open in the default Vite development URL, usually:

```bash
http://localhost:5173
```

## Appwrite Setup

This project uses Appwrite for authentication, database storage, and file uploads.

### Recommended configuration

- Create a new Appwrite project.
- Create a database and collection for blog posts.
- Configure a storage bucket for image uploads.
- Enable email/password authentication for users.

### Blog collection fields

Recommended document fields for the posts collection:

- `title`: string
- `content`: string or rich text
- `img_url`: string
- `status`: string (`active`, `draft`, etc.)
- `userId`: string
- `username`: string
- `slug`: string or document ID used for route lookup

## Available Scripts

```bash
npm run dev     # Run the dev server
npm run build   # Build the app for production
npm run preview # Preview the production build locally
npm run lint    # Run ESLint checks
```

## Environment Variables

| Variable                        | Description                                   | Required |
| ------------------------------- | --------------------------------------------- | -------- |
| `VITE_APPWRITE_URL`           | Appwrite API endpoint                         | Yes      |
| `VITE_APPWRITE_PROJECT_ID`    | Appwrite project ID                           | Yes      |
| `VITE_APPWRITE_DATABASE_ID`   | Appwrite database ID                          | Yes      |
| `VITE_APPWRITE_COLLECTION_ID` | Appwrite collection ID for posts              | Yes      |
| `VITE_APPWRITE_STORAGE_ID`    | Appwrite storage bucket ID for uploaded files | Yes      |
| `VITE_USER_READ_KEY`          | User read key used by Appwrite features       | Yes      |

## Usage

- Sign up or log in to access your blog dashboard.
- Publish blog posts from the add-post view.
- Edit or delete your own articles from your personal post list.
- Visit the home page to browse all published posts.
- Open individual post pages to read the full article.

## Routing Overview

The app includes the following routes:

- `/` — Home page with blog feed
- `/about` — About section
- `/contact-us` — Contact page
- `/login` — Login page
- `/signup` — Registration page
- `/my-posts` — Logged-in user's posts
- `/add-post` — Create a new post
- `/edit-post/:slug` — Update a post
- `/post/:slug` — View a single post
- `/user/:userId` — User-specific profile view

## License

This project is licensed under the MIT License.

## Acknowledgements

- React
- Vite
- Tailwind CSS
- Appwrite
- Redux Toolkit
- React Router
- React Quill
