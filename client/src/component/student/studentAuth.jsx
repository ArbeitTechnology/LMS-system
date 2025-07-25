<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiCalendar,
  FiMapPin
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const StudentAuth = ({ authMode, setAuthMode }) => {
  // Auth mode state

  const navigate = useNavigate();

=======
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiPhone, FiCalendar, FiMapPin, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentAuth = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // Tab system states
  const [activeTab, setActiveTab] = useState("register"); // register | verify | login
  const [registeredEmail, setRegisteredEmail] = useState("");
  
>>>>>>> origin/abusaid
  // Registration form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    date_of_birth: "",
    address: ""
  });

<<<<<<< HEAD
  const [files, setFiles] = useState({
    profile_photo: null
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: ""
  });
=======
  // OTP verification state
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
>>>>>>> origin/abusaid

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false
  });

<<<<<<< HEAD
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: ""
  });

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
=======
  // UI states
  const [errors, setErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);
>>>>>>> origin/abusaid

  // ========== REGISTRATION FUNCTIONS ==========
  const validateField = (name, value) => {
    let error = "";
<<<<<<< HEAD

=======
>>>>>>> origin/abusaid
    switch (name) {
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Must be at least 8 characters";
        else if (!/\d/.test(value)) error = "Must contain a number";
        else if (!/[!@#$%^&*]/.test(value))
          error = "Must contain a special character";
        break;
      case "full_name":
        if (!value) error = "Full name is required";
        else if (value.trim().split(/\s+/).length < 2)
          error = "Must include first and last name";
        break;
      case "phone":
        if (!value) error = "Phone is required";
<<<<<<< HEAD
        else if (!/^\+[1-9]\d{1,14}$/.test(value))
          error = "Include country code (e.g., +880)";
=======
>>>>>>> origin/abusaid
        break;
      case "date_of_birth":
        if (value && !/^\d{2}\/\d{2}\/\d{4}$/.test(value))
          error = "Use DD/MM/YYYY format";
        break;
      default:
        break;
    }
<<<<<<< HEAD

    setErrors((prev) => ({ ...prev, [name]: error }));
=======
    setErrors(prev => ({ ...prev, [name]: error }));
>>>>>>> origin/abusaid
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const validateForm = () => {
    let isValid = true;
    isValid = validateField("email", form.email) && isValid;
    isValid = validateField("password", form.password) && isValid;
    isValid = validateField("full_name", form.full_name) && isValid;
    isValid = validateField("phone", form.phone) && isValid;
=======
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(form).forEach(key => {
      if (key !== "date_of_birth" && key !== "address") {
        isValid = validateField(key, form[key]) && isValid;
      }
    });
>>>>>>> origin/abusaid
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Registration successful", {
        style: {
          background: "#fff",
          color: "#000",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }
      });

      // Reset form and switch to login
      setForm({
        email: "",
        password: "",
        full_name: "",
        phone: "",
        date_of_birth: "",
        address: ""
      });
      setFiles({
        profile_photo: null
      });
      setAuthMode("login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        style: {
          background: "#fff",
          color: "#000",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }
      });
=======
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${base_url}/api/auth/student/register`, form);
      
      setRegisteredEmail(form.email);
      setActiveTab("verify");
      setOtpCountdown(60); // 1 minute countdown
      toast.success("OTP sent to your email!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
>>>>>>> origin/abusaid
    } finally {
      setIsSubmitting(false);
    }
  };

<<<<<<< HEAD
  // ========== LOGIN FUNCTIONS ==========
  const validateLoginField = (name, value) => {
    let error = "";

=======
  // ========== OTP VERIFICATION FUNCTIONS ==========
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await axios.post(`${base_url}/api/auth/student/verify-otp`, {
        email: registeredEmail,
        otp
      });

      toast.success("Account verified successfully!");
      setActiveTab("login");
      setLoginForm(prev => ({ ...prev, email: registeredEmail }));
    } catch (err) {
      const errorMessage = err.response?.data?.message || "OTP verification failed";
      toast.error(errorMessage);
      setOtpError(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await axios.post(`${base_url}/api/auth/student/resend-otp`, {
        email: registeredEmail
      });
      setOtpCountdown(60); // Reset countdown
      toast.success("New OTP sent to your email!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to resend OTP";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  // ========== LOGIN FUNCTIONS ==========
  const validateLoginField = (name, value) => {
    let error = "";
>>>>>>> origin/abusaid
    switch (name) {
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!value) error = "Password is required";
        break;
      default:
        break;
    }
<<<<<<< HEAD

    setLoginErrors((prev) => ({ ...prev, [name]: error }));
=======
    setLoginErrors(prev => ({ ...prev, [name]: error }));
>>>>>>> origin/abusaid
    return !error;
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
<<<<<<< HEAD

    setLoginForm((prev) => ({ ...prev, [name]: val }));
=======
    setLoginForm(prev => ({ ...prev, [name]: val }));
>>>>>>> origin/abusaid
    if (loginErrors[name]) validateLoginField(name, val);
  };

  const validateLoginForm = () => {
    let isValid = true;
    isValid = validateLoginField("email", loginForm.email) && isValid;
    isValid = validateLoginField("password", loginForm.password) && isValid;
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validateLoginForm()) return;

    setIsLoginSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Login successful", {
        style: {
          background: "#fff",
          color: "#000",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }
      });

      // Navigate to dashboard
      navigate("/student/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        style: {
          background: "#fff",
          color: "#000",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }
      });
=======
    if (!validateLoginForm()) return;

    setIsLoginSubmitting(true);
    try {
      const response = await axios.post(`${base_url}/api/auth/student/login`, {
        email: loginForm.email,
        password: loginForm.password
      });

      const { token, student } = response.data;
      
      if (loginForm.remember) {
        localStorage.setItem("studentToken", token);
        localStorage.setItem("studentData", JSON.stringify(student));
      } else {
        localStorage.setItem("studentToken", token);
        localStorage.setItem("studentData", JSON.stringify(student));
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success("Login successful");
      navigate("/student/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      if (err.response?.data?.errors) {
        setLoginErrors(err.response.data.errors);
      }
>>>>>>> origin/abusaid
    } finally {
      setIsLoginSubmitting(false);
    }
  };
<<<<<<< HEAD
  const handleForgotPassword = () => {
    navigate("/student/forgotPassword", {
      state: { authMode } // Only pass serializable data
    });
  };
=======

  const handleForgotPassword = () => {
    navigate("/student/forgot-password");
  };

  // ========== RENDER FUNCTIONS ==========
  const renderRegisterTab = () => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Student Registration</h2>
        <p className="text-gray-600">Please fill in all mandatory fields to complete your registration</p>
      </div>

      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiMail className="mr-2 text-gray-500" /> Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={() => validateField("email", form.email)}
                placeholder="student@example.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-black focus:border-gray-500`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiLock className="mr-2 text-gray-500" /> Password *
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => validateField("password", form.password)}
                  placeholder="At least 8 characters with 1 number & special char"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-black focus:border-gray-500 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiUser className="mr-2 text-gray-500" /> Full Name *
              </label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                onBlur={() => validateField("full_name", form.full_name)}
                placeholder="First and Last name"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.full_name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-black focus:border-gray-500`}
              />
              {errors.full_name && <p className="text-sm text-red-500">{errors.full_name}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiPhone className="mr-2 text-gray-500" /> Phone *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={() => validateField("phone", form.phone)}
                placeholder="+8801912345678"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-black focus:border-gray-500`}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiCalendar className="mr-2 text-gray-500" /> Date of Birth
              </label>
              <input
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                onBlur={() => validateField("date_of_birth", form.date_of_birth)}
                placeholder="DD/MM/YYYY"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.date_of_birth ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-black focus:border-gray-500`}
              />
              {errors.date_of_birth && <p className="text-sm text-red-500">{errors.date_of_birth}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiMapPin className="mr-2 text-gray-500" /> Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Your current address"
                rows="2"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">* Mandatory fields</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              isSubmitting ? "bg-gray-600" : "bg-black hover:bg-gray-800"
            } transition-all shadow-md flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );

  const renderVerifyTab = () => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-w-md mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Your Account</h2>
        <p className="text-gray-600">
          We've sent a 6-digit OTP to <span className="font-medium">{registeredEmail}</span>
        </p>
      </div>

      <form onSubmit={handleVerifyOtp}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpError("");
              }}
              placeholder="Enter 6-digit code"
              maxLength="6"
              className={`w-full px-4 py-3 rounded-lg border ${
                otpError ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-black focus:border-gray-500`}
            />
            {otpError && <p className="text-sm text-red-500">{otpError}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={otpCountdown > 0 || isResending}
              className="text-sm text-gray-600 hover:text-blue-500 disabled:text-gray-400"
            >
              {isResending ? "Sending..." : otpCountdown > 0 ? `Resend in ${otpCountdown}s` : "Resend OTP"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-black hover:bg-gray-800 transition-all shadow-md"
          >
            Verify Account
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <button
          type="button"
          onClick={() => setActiveTab("register")}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          Back to Registration
        </button>
      </div>
    </motion.div>
  );

  const renderLoginTab = () => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-w-md mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Student Sign In</h2>
        <p className="text-gray-600">Enter your credentials to access your dashboard</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FiMail className="mr-2 text-gray-500" /> Email *
            </label>
            <input
              name="email"
              type="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              onBlur={() => validateLoginField("email", loginForm.email)}
              placeholder="student@example.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                loginErrors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-black focus:border-gray-500`}
            />
            {loginErrors.email && <p className="text-sm text-red-500">{loginErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FiLock className="mr-2 text-gray-500" /> Password *
            </label>
            <div className="relative">
              <input
                name="password"
                type={showLoginPassword ? "text" : "password"}
                value={loginForm.password}
                onChange={handleLoginChange}
                onBlur={() => validateLoginField("password", loginForm.password)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  loginErrors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-black focus:border-gray-500 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showLoginPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password}</p>}
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={loginForm.remember}
                onChange={handleLoginChange}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoginSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              isLoginSubmitting ? "bg-gray-600" : "bg-black hover:bg-gray-800"
            } transition-all shadow-md flex items-center justify-center`}
          >
            {isLoginSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Register here
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );

>>>>>>> origin/abusaid
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-5xl mx-auto">
<<<<<<< HEAD
        {/* Registration Form */}
        {authMode === "register" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Student Registration
              </h2>
              <p className="text-gray-600">
                Please fill in all mandatory fields to complete your
                registration
              </p>
            </div>

            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FiMail className="mr-2 text-gray-500" /> Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => validateField("email", form.email)}
                      placeholder="student@example.com"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-black focus:border-gray-500`}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FiLock className="mr-2 text-gray-500" /> Password *
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        onBlur={() => validateField("password", form.password)}
                        placeholder="At least 8 characters with 1 number & special char"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-black focus:border-gray-500 pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FiUser className="mr-2 text-gray-500" /> Full Name *
                    </label>
                    <input
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      onBlur={() => validateField("full_name", form.full_name)}
                      placeholder="First and Last name"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.full_name ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-black focus:border-gray-500`}
                    />
                    {errors.full_name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.full_name}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FiPhone className="mr-2 text-gray-500" /> Phone *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={() => validateField("phone", form.phone)}
                      placeholder="+8801912345678"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-black focus:border-gray-500`}
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FiCalendar className="mr-2 text-gray-500" /> Date of
                      Birth
                    </label>
                    <input
                      name="date_of_birth"
                      value={form.date_of_birth}
                      onChange={handleChange}
                      onBlur={() =>
                        validateField("date_of_birth", form.date_of_birth)
                      }
                      placeholder="DD/MM/YYYY"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.date_of_birth
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-black focus:border-gray-500`}
                    />
                    {errors.date_of_birth && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.date_of_birth}
                      </motion.p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FiMapPin className="mr-2 text-gray-500" /> Address
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Your current address"
                      rows="2"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 "
                    />
                  </div>
                </div>
              </div>

              {/* Profile Photo Upload */}
              <div className="mt-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Photo (JPG/PNG, max 2MB)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[60px] text-center hover:bg-gray-50">
                    {files.profile_photo ? (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-900 text-sm truncate max-w-[180px]">
                          {files.profile_photo.name}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setFiles((prev) => ({
                              ...prev,
                              profile_photo: null
                            }))
                          }
                          className="text-gray-400 hover:text-red-500 ml-2 transition-colors duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label className="block cursor-pointer">
                        <p className="text-gray-500 text-sm mb-1">
                          Click to upload photo
                        </p>
                        <p className="text-xs text-gray-400">JPG or PNG</p>
                        <input
                          type="file"
                          name="profile_photo"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".jpg,.jpeg,.png"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-4">* Mandatory fields</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                    isSubmitting ? "bg-gray-600" : "bg-black hover:bg-gray-800"
                  } transition-all shadow-md flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </motion.button>
                <div className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Sign In
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Login Form */}
        {authMode === "login" && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-w-md mx-auto"
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Student Sign In
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FiMail className="mr-2 text-gray-500" /> Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    onBlur={() => validateLoginField("email", loginForm.email)}
                    placeholder="student@example.com"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      loginErrors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-black focus:border-gray-500`}
                  />
                  {loginErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {loginErrors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FiLock className="mr-2 text-gray-500" /> Password *
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      onBlur={() =>
                        validateLoginField("password", loginForm.password)
                      }
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        loginErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-black focus:border-gray-500 pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                    >
                      {showLoginPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {loginErrors.password}
                    </motion.p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between pt-2"
                >
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        checked={loginForm.remember}
                        onChange={handleLoginChange}
                        className="sr-only"
                      />
                      <div className="block">
                        <div
                          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                            loginForm.remember ? "bg-black" : "bg-gray-300"
                          }`}
                        ></div>
                        <motion.div
                          className={`absolute top-0.5 left-0 w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                            loginForm.remember
                              ? "translate-x-1.5"
                              : "translate-x-0"
                          }`}
                          initial={false}
                          animate={{
                            x: loginForm.remember ? 20 : 3,
                            backgroundColor: loginForm.remember
                              ? "#ffffff"
                              : "#ffffff"
                          }}
                          style={{
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                          }}
                        ></motion.div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword} // Handle navigation on click
                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoginSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                    isLoginSubmitting
                      ? "bg-gray-600"
                      : "bg-black hover:bg-gray-800"
                  } transition-all shadow-md flex items-center justify-center`}
                >
                  {isLoginSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>

                {/* Register Link */}
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={() => setAuthMode("register")}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Register here
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
=======
        {activeTab === "register" && renderRegisterTab()}
        {activeTab === "verify" && renderVerifyTab()}
        {activeTab === "login" && renderLoginTab()}
>>>>>>> origin/abusaid
      </div>
    </motion.div>
  );
};

<<<<<<< HEAD
export default StudentAuth;
=======
export default StudentAuth;
>>>>>>> origin/abusaid
