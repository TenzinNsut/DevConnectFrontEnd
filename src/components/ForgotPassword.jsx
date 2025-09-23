import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const ForgotPassword = () => {
    const [emailId, setEmailId] = useState("");
    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");


    const navigate = useNavigate();

    

    //  Email Vlaidators
    // const validateEmail = (emailId) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(emailId);
    // };

    const handleEmailRequest = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        setError("");
        setSuccessMessage("");


        try {
            if (!emailId.trim()) {
                setError("Email address is requrired");
                return;
            }
             await axios.post(
                BASE_URL + "/forgot-password",
                { emailId },
                {}
            );

            setSuccessMessage("Password reset link sent to your email! You will be redirected to reset page in 10 seconds ");
            // Redirect to reset password page after 10 seconds
            setTimeout(() => {
                navigate('/reset-password')
            }, 10000);


        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong!");
            console.error("Forgot password error:", error);
        } 
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Forgot Password?
                    </h2>
                    <p className="mt-5 text-center tracking-tight text-white">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleEmailRequest} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-100"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    // Using UseState Hook
                                    value={emailId}
                                    onChange={(event) => setEmailId(event.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            {error && (<p className="flex w-full my-5 text-red-500 justify-center">{error}</p>)}
                            {successMessage && (<p className="flex w-full my-5 text-green-500 justify-center">{successMessage}</p>)}
                            <button
                                type="submit"
                                className="btn flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
