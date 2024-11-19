import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeToggle from './DarkModeToggle';
import UserDropdown from './UserDropdown';
import Swal from 'sweetalert2';
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice';


function Navbar() {

    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const authStatus = useSelector((state) => state.auth.status)

    const [isOpen, setIsOpen] = useState(false);
    const [userDropDownIsOpen, setUserDropDownIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const setUserDropDownFalse = () => {
        setUserDropDownIsOpen(false);
    }

    const handleLogout = () => {

        authService.logout().then(() => {
            dispatch(logout());
            navigate('/login');
            localStorage.removeItem('isDarkmode');

            setUserDropDownIsOpen(false);
            Swal.fire({
                title: 'Logged out!',
                text: 'You have been successfully logged out.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false,
            });

        }).catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong during logout. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
            });
            console.error("Logout error:", error);
        })
    };

    const showAlertForLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to log out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        });
    };




    return (
        <nav className="bg-white dark:bg-[#133E87] py-1 md:mt-5 inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 dark:border-gray-700 shadow backdrop-blur-lg md:top-6 md:rounded-full lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex shrink-0">
                        <Link aria-current="page" className="flex items-center" to="/">
                            <img className="ml-2 w-18 h-14 object-contain" src="/images/nav_logo.png" alt="Logo" />
                            <p className="sr-only">BlogBox</p>
                        </Link>
                    </div>

                    {/* Mobile-only User Icon */}
                    {authStatus && (
                        <div className="md:hidden lg:hidden space-x-4">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setUserDropDownIsOpen(!userDropDownIsOpen)}
                                    className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    <img src="/images/user-icon.png" alt="User Profile" className="object-cover rounded-full w-10 h-10" />
                                </button>
                                {userDropDownIsOpen && <UserDropdown setUserDropDownFalse={setUserDropDownFalse} showAlertForLogout={showAlertForLogout} position='right-2/4 top-12 font-sans w-1/4 min-w-[8rem]' />}
                            </div>
                        </div>
                    )}

                    {/* Dark Mode Toggle for mobile */}
                    <div className="lg:hidden md:hidden">
                        <DarkModeToggle />
                    </div>

                    {/* Hamburger Menu for mobile */}
                    <div className="lg:hidden md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <Link
                            className="inline-block rounded-lg px-2 py-1 text-lg font-bold text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            to="/">
                            Home
                        </Link>
                        <Link
                            className="inline-block rounded-lg px-2 py-1 text-lg font-bold text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            to="/about">
                            About
                        </Link>
                        <Link
                            className="inline-block rounded-lg px-2 py-1 text-lg font-bold text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            to="/contact-us">
                            Contact Us
                        </Link>
                    </div>

                    {/* Desktop Dark Mode Toggle */}
                    <div className="hidden md:block lg:block">
                        <DarkModeToggle />
                    </div>

                    {/* Sign In/Out | User Icon Buttons */}
                    <div className="hidden md:flex md:items-center lg:flex lg:items-center space-x-4">
                        {authStatus ? (
                            <div className="relative flex items-center space-x-4">
                                <button onClick={() => setUserDropDownIsOpen(!userDropDownIsOpen)} className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                    <img src="/images/user-icon.png" alt="User Profile" className="object-cover rounded-full w-10 h-10" />
                                </button>
                                {userDropDownIsOpen && <UserDropdown setUserDropDownFalse={setUserDropDownFalse} showAlertForLogout={showAlertForLogout} position='right-0 top-12 font-sans w-full min-w-[11rem]' />}
                            </div>
                        ) : (
                            <>
                                <Link
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                    to="/signup">
                                    Sign up
                                </Link>
                                <Link
                                    className="bg-blue-600 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-600"
                                    to="/login">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden lg:hidden mt-4 space-y-4 px-4 text-center last:mb-2">
                        <hr className="border-0.5 h-0.5 bg-transparent bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
                        <Link
                            className="block text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                            to="/" 
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <hr className="border-0.5 h-0.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 rounded-full" />
                        <Link
                            className="block text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                            to="/about"
                            onClick={toggleMenu}
                        >
                            About
                        </Link>
                        <hr className="border-0.5 h-0.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 rounded-full" />
                        <Link
                            className="block text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                            to="/contact-us" 
                            onClick={toggleMenu}
                        >
                            Contact Us
                        </Link>
                        <hr className="border-0.5 h-0.5 bg-gradient-to-r from-gray-400 via-gray-900 to-gray-400 rounded-full" />

                        { !authStatus && (
                            <>
                                <Link
                                    className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                    to="/signup"
                                    onClick={toggleMenu}
                                >
                                    Sign up
                                </Link>
                                <Link
                                    className="block w-full bg-blue-600 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-600"
                                    to="/login"
                                    onClick={toggleMenu}
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>

    );
};

export default Navbar; 