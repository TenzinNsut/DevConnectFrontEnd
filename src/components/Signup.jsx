import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/Cards/UserCard";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: " ",
    emailId: " ",
    password: "",
    age: " ",
    gender: "male",
    photoUrl:
      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    about: " ",
    skills: [],
  });

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); // screen size for confetti
  const [showModal, setShowModal] = useState(false);

  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case "firstName":
        if (!value) error = "First name is required.";
        else if (value.trim().length < 3 || value.trim().length > 50)
          error = "First name must be between 3 and 50 characters.";
        break;

      case "lastName":
        if (value && (value.trim().length < 4 || value.trim().length > 50))
          error = "Last name must be between 4 and 50 characters.";
        break;

      case "emailId":
        if (!value) error = "Email is required.";
        else if (!validator.isEmail(value))
          error = "Please enter a valid email address.";
        break;

      case "password":
        if (!value) error = "Password is required.";
        else if (
          !validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          error =
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
        }
        break;

      case "age":
        if (!value) error = "Age is required.";
        else if (value < 18 || value > 120)
          error = "Age must be between 18 and 120.";
        break;

      case "gender":
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          error = "Gender must be either male, female, or others.";
        }
        break;

      case "photoUrl":
        if (value && !validator.isURL(value))
          error = "Please enter a valid URL.";
        break;

      case "about":
        if (value && (value.trim().length < 20 || value.trim().length > 200))
          error = "About must be between 20 and 200 characters.";
        break;

      case "skills": {
        const skillsArray =
          typeof value === "string"
            ? value.split(",").map((s) => s.trim())
            : value;
        if (!skillsArray || skillsArray.length === 0)
          error = "At least one skill is required.";
        else if (skillsArray.length > 10)
          error = "You cannot add more than 10 skills.";
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
    if (name === "gender") {
      sanitizedValue = value.trim().toLowerCase();
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    const error = validateField(name, sanitizedValue);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    let isValid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
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
      skills:
        typeof formData.skills === "string"
          ? formData.skills.split(",").map((s) => s.trim())
          : formData.skills,
    };

    try {
      await axios.post(BASE_URL + "/signup", dataToSubmit, {
        withCredentials: true,
      });

      setShowModal(true);
      setSuccess(
        "🎉 Signup successful! Welcome aboard. Redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 10000);
    } catch (err) {
      const message = err.response?.data?.errors
        ? err.response.data.errors.map((e) => e.message).join(", ")
        : err.response?.data ||
          "An error occurred while updating your profile.";
      setApiError(message);
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen text-white">
        {/* Header */}
        <div className="pt-12 pb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Join DevConnect
          </h1>
          <p className="text-gray-400">
            Create your developer profile and start connecting
          </p>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className={`w-full rounded-lg bg-gray-800/50 border ${
                          formErrors.firstName
                            ? "border-red-500"
                            : "border-gray-700"
                        } text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors`}
                      />
                      {formErrors.firstName && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className={`w-full rounded-lg bg-gray-800/50 border ${
                          formErrors.lastName
                            ? "border-red-500"
                            : "border-gray-700"
                        } text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors`}
                      />
                      {formErrors.lastName && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email and Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full rounded-lg bg-gray-800/50 border ${
                          formErrors.emailId
                            ? "border-red-500"
                            : "border-gray-700"
                        } text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors`}
                      />
                      {formErrors.emailId && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.emailId}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className={`w-full rounded-lg bg-gray-800/50 border ${
                            formErrors.password
                              ? "border-red-500"
                              : "border-gray-700"
                          } text-white px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {formErrors.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Age and Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        className={`w-full rounded-lg bg-gray-800/50 border ${
                          formErrors.age ? "border-red-500" : "border-gray-700"
                        } text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors`}
                      />
                      {formErrors.age && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.age}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Profile Photo URL
                    </label>
                    <input
                      type="url"
                      name="photoUrl"
                      value={
                        formData.photoUrl ||
                        "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className={`w-full rounded-lg bg-gray-800/50 border ${
                        formErrors.photoUrl
                          ? "border-red-500"
                          : "border-gray-700"
                      } text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors`}
                    />
                    {formErrors.photoUrl && (
                      <p className="text-red-400 text-sm mt-1">
                        {formErrors.photoUrl}
                      </p>
                    )}
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      About
                    </label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Write something about yourself..."
                      className={`w-full rounded-lg bg-gray-800/50 border ${
                        formErrors.about ? "border-red-500" : "border-gray-700"
                      } text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none transition-colors`}
                    />
                    {formErrors.about && (
                      <p className="text-red-400 text-sm mt-1">
                        {formErrors.about}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. React, Node.js, Python"
                      className={`w-full rounded-lg bg-gray-800/50 border ${
                        formErrors.skills ? "border-red-500" : "border-gray-700"
                      } text-white px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors`}
                    />
                    {formErrors.skills && (
                      <p className="text-red-400 text-sm mt-1">
                        {formErrors.skills}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Create Account
                  </button>

                  {/* Error Message */}
                  {apiError && (
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                      <p className="text-red-400 text-sm text-center">
                        {apiError}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Preview Section */}
            <div className="w-full lg:w-1/2">
              <div className="lg:sticky top-8">
                <h3 className="text-center text-2xl font-bold text-white mb-6">
                  Live Preview
                </h3>
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
        <Confetti
          width={width}
          height={height}
          recycle={false} // makes confetti stop instead of looping
          numberOfPieces={400} // adjust pieces as needed
          style={{ zIndex: 100 }}
        />
      )}

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal Box */}
          <div className="relative bg-gray-900 rounded-2xl p-8 text-center max-w-md shadow-2xl border border-gray-700">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Welcome to DevConnect!
            </h2>
            <p className="text-gray-300 mb-6">
              Your account has been created successfully. You'll be redirected
              to the login page in{" "}
              <span className="font-semibold text-white">10 seconds</span>.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/login");
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300"
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
