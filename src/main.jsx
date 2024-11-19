import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './components/auth';
import { Home, Login, Signup, MyPost, AddPost, EditPost, Post, ContactUs, About, UserPorfile } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route exact path='' element={<Home />} />
      <Route exact path='about' element={<About />} />
      <Route exact path='contact-us' element={<ContactUs linkedinLink={'https://www.linkedin.com/in/atharva-mane/'} githubLink={"https://github.com/atharva026"} />} />

      <Route exact path='login' element={<AuthLayout authentication={false} ><Login /></AuthLayout>} />
      <Route exact path='signup' element={<AuthLayout authentication={false} ><Signup /></AuthLayout>} />

      <Route exact path='my-posts' element={<AuthLayout authentication ><MyPost /></AuthLayout>} />
      <Route exact path='add-post' element={<AuthLayout authentication ><AddPost /></AuthLayout>} />

      <Route exact path='edit-post/:slug' element={<AuthLayout authentication ><EditPost /></AuthLayout>} />
      <Route exact path='post/:slug' element={<Post />} />

      <Route exact path='user/:userId' element={<AuthLayout authentication ><UserPorfile /></AuthLayout>} />

    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
