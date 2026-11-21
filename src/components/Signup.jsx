import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/Cards/UserCard";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Eye, EyeOff, Upload, Link as LinkIcon, X, Check } from "lucide-react";
import { DEFAULT_AVATAR, compressImage } from "../utils/imageHelper";
import Navbar from "./Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "male",
    photoUrl: DEFAULT_AVATAR,
    about: "",
    skills: [],
  });

  const [imageMode, setImageMode] = useState("upload");
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
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
        if (value && (value.trim().length < 3 || value.trim().length > 50))
          error = "Last name must be between 3 and 50 characters.";
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
        if (
          value &&
          !validator.isURL(value, { require_protocol: true, require_tld: false }) &&
          !validator.isDataURI(value)
        )
          error = "Please enter a valid URL or upload a valid image.";
        break;

      case "about":
        if (value && (value.trim().length < 20 || value.trim().length > 200))
          error = "About must be between 20 and 200 characters.";
        break;

      case "skills": {
        const skillsArray =
          typeof value === "string"
            ? value.split(",").map((s) => s.trim()).filter(Boolean)
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
        photoUrl: "Image file is too large. Maximum size is 10 MB.",
      }));
      return;
    }

    setIsProcessingImage(true);
    try {
      const compressedDataUrl = await compressImage(file, {
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.82,
      });

      setFormData((prev) => ({ ...prev, photoUrl: compressedDataUrl }));
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated.photoUrl;
        return updated;
      });
    } catch (err) {
      console.error("Image compression error:", err);
      setFormErrors((prev) => ({
        ...prev,
        photoUrl: "Could not optimize image. Try another file or URL.",
      }));
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleResetToDefault = () => {
    setFormData((prev) => ({ ...prev, photoUrl: DEFAULT_AVATAR }));
    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated.photoUrl;
      return updated;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
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
      setApiError("Please fix the form errors before submitting.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      skills:
        typeof formData.skills === "string"
          ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : formData.skills,
    };

    try {
      await axios.post(BASE_URL + "/signup", dataToSubmit, {
        withCredentials: true,
      });

      setShowModal(true);
      setSuccess("Account created successfully. Welcome aboard.");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      const message = err.response?.data?.errors
        ? err.response.data.errors.map((e) => e.message).join(", ")
        : err.response?.data ||
          "An error occurred while creating your account.";
      setApiError(message);
      console.error(err);
    }
  };

  return (
    <div className="bg-black min-h-screen text-[#E1E0CC] selection:bg-[#E1E0CC] selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-20 space-y-12">
        {/* Header */}
        <div className="space-y-2 border-b border-white/10 pb-6 text-center lg:text-left">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/50">
            Registration
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#E1E0CC]">
            Join DevConnect
          </h1>
          <p className="text-sm text-[#E1E0CC]/60 font-normal">
            Create your technical developer profile and start pairing with peers.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#111113] rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={`w-full rounded-2xl bg-black border ${
                        formErrors.firstName ? "border-red-500/70" : "border-white/10"
                      } text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-400 text-xs mt-1 font-mono">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={`w-full rounded-2xl bg-black border ${
                        formErrors.lastName ? "border-red-500/70" : "border-white/10"
                      } text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-400 text-xs mt-1 font-mono">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email and Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full rounded-2xl bg-black border ${
                        formErrors.emailId ? "border-red-500/70" : "border-white/10"
                      } text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30`}
                    />
                    {formErrors.emailId && (
                      <p className="text-red-400 text-xs mt-1 font-mono">
                        {formErrors.emailId}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create strong password"
                        className={`w-full rounded-2xl bg-black border ${
                          formErrors.password
                            ? "border-red-500/70"
                            : "border-white/10"
                        } text-[#E1E0CC] px-4 py-3 pr-12 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#E1E0CC]/50 hover:text-[#E1E0CC] cursor-pointer"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-red-400 text-xs mt-1 font-mono">
                        {formErrors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Age and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter age"
                      className={`w-full rounded-2xl bg-black border ${
                        formErrors.age ? "border-red-500/70" : "border-white/10"
                      } text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30`}
                    />
                    {formErrors.age && (
                      <p className="text-red-400 text-xs mt-1 font-mono">
                        {formErrors.age}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-black border border-white/10 text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                {/* Photo Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60">
                      Profile Photo
                    </label>
                    <div className="flex items-center bg-black p-1 rounded-full border border-white/10 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setImageMode("upload")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                          imageMode === "upload"
                            ? "bg-[#E1E0CC] text-black font-semibold shadow-sm"
                            : "text-[#E1E0CC]/60 hover:text-[#E1E0CC]"
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageMode("url")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                          imageMode === "url"
                            ? "bg-[#E1E0CC] text-black font-semibold shadow-sm"
                            : "text-[#E1E0CC]/60 hover:text-[#E1E0CC]"
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        URL
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
                        className={`relative border border-dashed rounded-2xl p-6 text-center transition-all ${
                          isDragging
                            ? "border-[#E1E0CC] bg-white/5"
                            : "border-white/15 hover:border-white/30 bg-black/60"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          id="photo-upload"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                        >
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E1E0CC] border border-white/10">
                            {isProcessingImage ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#E1E0CC] border-t-transparent" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                          </div>
                          <p className="text-xs font-medium text-[#E1E0CC]">
                            Click to choose file or drag & drop
                          </p>
                          <p className="text-[10px] font-mono text-[#E1E0CC]/40">
                            PNG, JPG, or WebP (auto-optimized)
                          </p>
                        </label>
                      </div>

                      {formData.photoUrl &&
                        formData.photoUrl !== DEFAULT_AVATAR && (
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between text-xs font-mono text-[#E1E0CC]">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={formData.photoUrl}
                                alt="Uploaded preview"
                                className="w-8 h-8 rounded-lg object-cover border border-white/10"
                              />
                              <span className="text-xs">Image selected & ready</span>
                            </div>
                            <button
                              type="button"
                              onClick={handleResetToDefault}
                              className="text-[#E1E0CC]/50 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reset</span>
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
                        placeholder="https://example.com/photo.jpg"
                        className="w-full rounded-2xl bg-black border border-white/10 text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30"
                      />
                    </div>
                  )}

                  {formErrors.photoUrl && (
                    <p className="text-red-400 text-xs mt-1 font-mono">
                      {formErrors.photoUrl}
                    </p>
                  )}
                </div>

                {/* About Section */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                    About / Bio
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Write about your technical focus and project interests..."
                    className={`w-full rounded-2xl bg-black border ${
                      formErrors.about ? "border-red-500/70" : "border-white/10"
                    } text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30 resize-none`}
                  ></textarea>
                  {formErrors.about && (
                    <p className="text-red-400 text-xs mt-1 font-mono">
                      {formErrors.about}
                    </p>
                  )}
                </div>

                {/* Skills Section */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, Python, Go, Docker"
                    className={`w-full rounded-2xl bg-black border ${
                      formErrors.skills ? "border-red-500/70" : "border-white/10"
                    } text-[#E1E0CC] px-4 py-3 text-sm focus:border-[#E1E0CC]/50 outline-none transition-colors placeholder-[#E1E0CC]/30`}
                  />
                  {formErrors.skills && (
                    <p className="text-red-400 text-xs mt-1 font-mono">
                      {formErrors.skills}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full font-medium text-sm text-black transition-all hover:opacity-95 shadow-xl cursor-pointer"
                  style={{ backgroundColor: "#E1E0CC" }}
                >
                  Create Account
                </button>

                {/* Error Message */}
                {apiError && (
                  <div className="bg-red-950/40 border border-red-800/80 rounded-2xl p-3">
                    <p className="text-red-300 text-xs text-center font-mono">
                      {apiError}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky top-28 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/50 text-center">
                Live Preview
              </h3>
              <div className="flex justify-center">
                <UserCard user={formData} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Confetti & Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          <div className="relative bg-[#111113] border border-white/15 rounded-3xl p-8 text-center max-w-md shadow-2xl space-y-5">
            <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto text-[#E1E0CC]">
              <Check className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-medium tracking-tight text-[#E1E0CC]">
                Welcome to DevConnect
              </h2>
              <p className="text-xs text-[#E1E0CC]/70 leading-relaxed font-normal">
                Your technical profile has been created successfully. Redirecting you to the sign-in page...
              </p>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/login");
              }}
              className="py-3 px-8 rounded-full text-sm font-medium text-black transition-all hover:opacity-95 shadow-xl cursor-pointer"
              style={{ backgroundColor: "#E1E0CC" }}
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={350}
          style={{ zIndex: 100 }}
        />
      )}
    </div>
  );
};

export default Signup;
