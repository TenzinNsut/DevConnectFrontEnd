// EditProfile.jsx
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/Cards/UserCard";
import validator from 'validator';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import DeleteUser from "./DeleteUser";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { DEFAULT_AVATAR, compressImage } from "../utils/imageHelper";
// import LivePreviewCard from "./Cards/livePreviewCard";


const EditProfile = ({ user }) => {

    const [formData, setFormData] = useState({
        firstName: user.firstName || ' ',
        lastName: user.lastName || ' ',
        age: user.age || ' ',
        gender: user.gender || 'male',
        photoUrl: user.photoUrl || ' ',
        about: user.about || ' ',
        skills: user.skills || [],
    });

    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [toast, setToast] = useState(false);
    const [imageMode, setImageMode] = useState("upload");
    const [isProcessingImage, setIsProcessingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const { width, height } = useWindowSize(); // screen size for confetti
    // React Redux Store:
    const dispatch = useDispatch(); // action



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
                if (value && !validator.isURL(value, { require_protocol: true, require_tld: false }) && !validator.isDataURI(value))
                    error = 'Please enter a valid URL or upload a valid image.';
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


    const handleImageFile = async (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setFormErrors((prev) => ({
                ...prev,
                photoUrl: "Please select a valid image file (PNG, JPG, WebP).",
            }));
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setFormErrors((prev) => ({
                ...prev,
                photoUrl: "Image file size should be under 10MB.",
            }));
            return;
        }

        try {
            setIsProcessingImage(true);
            const dataUrl = await compressImage(file);
            setFormData((prev) => ({ ...prev, photoUrl: dataUrl }));
            setFormErrors((prev) => ({ ...prev, photoUrl: null }));
        } catch (err) {
            setFormErrors((prev) => ({
                ...prev,
                photoUrl: err.message || "Failed to process image.",
            }));
        } finally {
            setIsProcessingImage(false);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleImageFile(file);
        }
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
        setToast(false);

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
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                dataToSubmit,
                { withCredentials: true }
            );
            setSuccess("Profile updated successfully!");
            setToast(true);

            setTimeout(() => {
                setToast(false);
            }, 5000)


            dispatch(addUser(res?.data?.data));



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
            <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
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

                                    {/* Profile Photo Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-400">Profile Photo</label>
                                            <div className="flex items-center bg-gray-800 p-0.5 rounded-lg border border-gray-700 text-xs">
                                                <button
                                                    type="button"
                                                    onClick={() => setImageMode("upload")}
                                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                                                        imageMode === "upload"
                                                            ? "bg-indigo-600 text-white font-medium shadow"
                                                            : "text-gray-400 hover:text-gray-200"
                                                    }`}
                                                >
                                                    <Upload className="w-3.5 h-3.5" />
                                                    Upload Image
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setImageMode("url")}
                                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                                                        imageMode === "url"
                                                            ? "bg-indigo-600 text-white font-medium shadow"
                                                            : "text-gray-400 hover:text-gray-200"
                                                    }`}
                                                >
                                                    <LinkIcon className="w-3.5 h-3.5" />
                                                    Image URL
                                                </button>
                                            </div>
                                        </div>

                                        {imageMode === "upload" ? (
                                            <div className="space-y-3">
                                                <div
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                        setIsDragging(true);
                                                    }}
                                                    onDragLeave={() => setIsDragging(false)}
                                                    onDrop={handleDrop}
                                                    className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all ${
                                                        isDragging
                                                            ? "border-indigo-500 bg-indigo-500/10"
                                                            : "border-gray-700 hover:border-gray-600 bg-gray-800/40"
                                                    }`}
                                                >
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="edit-photo-upload"
                                                        onChange={handleFileInputChange}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="edit-photo-upload"
                                                        className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-indigo-400 border border-gray-700">
                                                            {isProcessingImage ? (
                                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent" />
                                                            ) : (
                                                                <Upload className="w-5 h-5" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-white">
                                                                {isProcessingImage ? "Optimizing image..." : "Click to choose file or drag & drop"}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, or WebP</p>
                                                        </div>
                                                    </label>
                                                </div>

                                                {formData.photoUrl && formData.photoUrl !== DEFAULT_AVATAR && (
                                                    <div className="flex items-center justify-between p-2.5 bg-gray-800/60 border border-gray-700 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={formData.photoUrl}
                                                                alt="Preview"
                                                                className="w-10 h-10 rounded-lg object-cover border border-gray-600"
                                                            />
                                                            <span className="text-xs text-indigo-400 font-medium">New photo selected</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData((prev) => ({ ...prev, photoUrl: DEFAULT_AVATAR }));
                                                                setFormErrors((prev) => ({ ...prev, photoUrl: null }));
                                                            }}
                                                            className="cursor-pointer flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-950/40 hover:bg-red-950/60 transition"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                            Reset to Default
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <input
                                                    type="url"
                                                    name="photoUrl"
                                                    value={formData.photoUrl}
                                                    onChange={handleChange}
                                                    placeholder="Enter image URL"
                                                    className={`w-full rounded-lg bg-gray-800 border ${formErrors.photoUrl ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none`}
                                                />
                                            </div>
                                        )}
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
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                                {apiError && (<p className="text-red-500 mt-4 text-center">{apiError}</p>)}
                                {success && (<p className="text-green-500 mt-4 text-center">{success}</p>)}
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


            <DeleteUser/>



            {/* Confetti always overlays everything */}
            {success && (
                <>
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}   // makes confetti stop instead of looping
                        numberOfPieces={400} // adjust pieces as needed
                        style={{ zIndex: 100 }}
                    />
                </>
            )}


            {toast && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                    {/* Modal Box */}
                    <div className="relative bg-gray-900 rounded-2xl p-8 text-center max-w-md shadow-2xl z-50 shadow-gray-900/25">
                        <h2 className="text-3xl font-bold text-green-400 mb-4">Success! ✅</h2>
                        <p className="text-2xl text-gray-300 mb-6 font-semibold">
                            Profile updated successfully 🎉
                            {/* <span className="font-semibold text-white">10 seconds</span>. */}
                        </p>
                    </div>
                </div>
            )} 
        </>
    );
};

export default EditProfile;