import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from '../../store/authSlice';
import { Button } from '../buttons/index';
import { Input } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";


function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [error, setError] = useState('');

    const create = async (data) => {
        setError('');
        try {
            const createdUser = await authService.createAccount(data);

            if (createdUser) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin({ userData }));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img className="w-18 h-18 object-contain" src="/images/logo.png" alt="Logo" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                                minLength: {
                                    value: 3, // Minimum length
                                    message: "Name must be at least 3 characters long", // Custom error message
                                },
                                maxLength: {
                                    value: 10, // Maximum length
                                    message: "Name must not exceed 10 characters", // Custom error message for maxLength
                                },
                            })}
                        />
                        {errors.name && <p className="text-red-500 text-sm text-right m-0 p-0">{errors.name.message}</p>}

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full rounded-lg">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm