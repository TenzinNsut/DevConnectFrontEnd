import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/Cards/UserCard";
import validator from 'validator';
import { Link, useNavigate } from "react-router-dom";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";


const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: " ",
    emailId: " ",
    password: "",
    age: " ",
    gender: "male",
    photoUrl: " https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    about: " ",
    skills: [],
  });



  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); // screen size for confetti
  const [showModal, setShowModal] = useState(false);




  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case 'firstName':
        if (!value) error = 'First name is required.';
        else if (value.trim().length < 3 || value.trim().length > 50)
          error = 'First name must be between 3 and 50 characters.';
        break;

      case 'lastName':
        if (value && (value.trim().length < 4 || value.trim().length > 50))
          error = 'Last name must be between 4 and 50 characters.';
        break;

      case 'emailId':
        if (!value) error = 'Email is required.';
        else if (!validator.isEmail(value))
          error = 'Please enter a valid email address.';
        break;

      case 'password':
        if (!value) error = 'Password is required.';
        else if (!validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        })) {
          error = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
        }
        break;

      case 'age':
        if (!value) error = 'Age is required.';
        else if (value < 18 || value > 120)
          error = 'Age must be between 18 and 120.';
        break;

      case 'gender':
        if (!['male', 'female', 'others'].includes(value.toLowerCase())) {
          error = 'Gender must be either male, female, or others.';
        }
        break;

      case 'photoUrl':
        if (value && !validator.isURL(value))
          error = 'Please enter a valid URL.';
        break;

      case 'about':
        if (value && (value.trim().length < 20 || value.trim().length > 200))
          error = 'About must be between 20 and 200 characters.';
        break;

      case 'skills': {
        const skillsArray = typeof value === 'string' ? value.split(',').map(s => s.trim()) : value;
        if (!skillsArray || skillsArray.length === 0)
          error = 'At least one skill is required.';
        else if (skillsArray.length > 10)
          error = 'You cannot add more than 10 skills.';
        break;
      }

      default:
        break;
    }

    return error;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    let sanitizedValue = value;
    // Only sanitize gender on change, as trimming other text inputs on every keystroke
    // prevents the user from typing spaces between words.
    if (name === 'gender') {
      sanitizedValue = value.trim().toLowerCase();
    }

    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));

    const error = validateField(name, sanitizedValue);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    let isValid = true;
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setFormErrors(newErrors);

    if (!isValid) {
      setApiError("Please fix the errors before submitting.");
      return;
    }

    // Prepare data for submission, ensuring skills is an array
    const dataToSubmit = {
      ...formData,
      skills: typeof formData.skills === 'string'
        ? formData.skills.split(',').map(s => s.trim())
        : formData.skills
    };

    try {
      await axios.post(
        BASE_URL + "/signup",
        dataToSubmit,
        { withCredentials: true }
      );

      setShowModal(true);
      setSuccess("🎉 Signup successful! Welcome aboard. Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 10000)

    } catch (err) {
      const message = err.response?.data?.errors
        ? err.response.data.errors.map(e => e.message).join(', ')
        : (err.response?.data || "An error occurred while updating your profile.");
      setApiError(message);
      console.error(err);
    }
  };
  return (
    <>
      <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className={`w-full rounded-lg bg-gray-800 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                      {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className={`w-full rounded-lg bg-gray-800 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                      {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                    </div>
                  </div>


                  {/* Email and Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input
                        type="text"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        placeholder="Enter you email Address"
                        className={`w-full rounded-lg bg-gray-800 border ${formErrors.emailId ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                      {formErrors.emailId && <p className="text-red-500 text-xs mt-1">{formErrors.emailId}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2  ">Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter you password"
                          className={`w-full rounded-lg bg-gray-800 border ${formErrors.password ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                        />

                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                        >
                          {showNewPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}

                    </div>


                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        className={`w-full rounded-lg bg-gray-800 border ${formErrors.age ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                      />
                      {formErrors.age && <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Profile Photo URL</label>
                    <input
                      type="url"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className={`w-full rounded-lg bg-gray-800 border ${formErrors.photoUrl ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                    />
                    {formErrors.photoUrl && <p className="text-red-500 text-xs mt-1">{formErrors.photoUrl}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">About</label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Write something about yourself..."
                      className={`w-full rounded-lg bg-gray-800 border ${formErrors.about ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none`}
                    ></textarea>
                    {formErrors.about && <p className="text-red-500 text-xs mt-1">{formErrors.about}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Skills (comma separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. React, Node.js, Python"
                      className={`w-full rounded-lg bg-gray-800 border ${formErrors.skills ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                    />
                    {formErrors.skills && <p className="text-red-500 text-xs mt-1">{formErrors.skills}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                {apiError && (<p className="text-red-500 mt-4 text-center">{apiError}</p>)}
              </div>
            </div>

            {/* Preview Section */}
            <div className="w-full lg:w-1/2">
              <div className="lg:sticky top-28">
                <h3 className="text-center text-2xl font-bold text-white mb-6">Live Preview</h3>
                <div className="flex justify-center">
                  <UserCard user={formData} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      
          {/* Confetti always overlays everything */}
       {success && (
                  <>
                    {/* <p className="text-green-500 mt-4 text-center">{success}</p> */}
                    <Confetti
                      width={width}
                      height={height}
                      recycle={false}   // makes confetti stop instead of looping
            numberOfPieces={400} // adjust pieces as needed
                    style={{ zIndex: 100 }}
                    />
                  </>
                )}



    {/* Success Modal */}
    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        {/* Modal Box */}
        <div className="relative bg-gray-900 rounded-2xl p-8 text-center max-w-md shadow-2xl z-50">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Signup Successful 🎉</h2>
          <p className="text-gray-300 mb-6">
            Welcome aboard! You’ll be redirected to the login page in{" "}
            <span className="font-semibold text-white">10 seconds</span>.
          </p>
          <button
            onClick={() => {
              setShowModal(false);
              navigate("/login");
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition"
          >
            Go to Login Now
          </button>
        </div>
      </div>
    )}





    </>

  );
};

export default Signup;
