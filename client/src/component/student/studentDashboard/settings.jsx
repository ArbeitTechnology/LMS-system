/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiCalendar,
  FiMapPin,
<<<<<<< HEAD
=======
  FiUser,
  FiMail,
>>>>>>> origin/abusaid
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

<<<<<<< HEAD
const Settings = () => {
=======
const StudentSettings = () => {
>>>>>>> origin/abusaid
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    profile_photo: null,
<<<<<<< HEAD
=======
    isVerified: false,
    createdAt: "",
>>>>>>> origin/abusaid
  });
  const [editMode, setEditMode] = useState({
    full_name: false,
    email: false,
    phone: false,
    date_of_birth: false,
    address: false,
  });
  const [tempProfile, setTempProfile] = useState({});
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          "http://localhost:3500/api/auth/student",
=======
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    photo: false,
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
    const studentdata=JSON.parse(localStorage.getItem("studentData"));
  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateString;
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          `http://localhost:3500/api/student/profile/${studentdata.id}`,
>>>>>>> origin/abusaid
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

<<<<<<< HEAD
        setProfile({
          full_name: response.data.full_name || "Student User",
          email: response.data.email || "student@example.com",
          phone: response.data.phone || "",
          date_of_birth: response.data.date_of_birth || "",
          address: response.data.address || "",
          profile_photo: response.data.profile_photo || null,
=======
        const studentData = response.data.student;
        setProfile({
          full_name: studentData.full_name || "",
          email: studentData.email || "",
          phone: studentData.phone || "",
          date_of_birth: studentData.date_of_birth || "",
          address: studentData.address || "",
          profile_photo: studentData.profile_photo || null,
          isVerified: studentData.isVerified || false,
          createdAt: studentData.createdAt || "",
>>>>>>> origin/abusaid
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, []);

  // Handle edit toggle
  const handleEditToggle = (field) => {
    if (editMode[field]) {
      setEditMode({ ...editMode, [field]: false });
    } else {
      setTempProfile({ ...profile });
      setEditMode({ ...editMode, [field]: true });
    }
  };

  // Handle profile field changes
  const handleProfileChange = (e, field) => {
    const value = e.target.value;
<<<<<<< HEAD
    if (field === "email") {
      // Convert email to lowercase if the field is email
      setTempProfile({ ...tempProfile, [field]: value.toLowerCase() });
    } else {
      setTempProfile({ ...tempProfile, [field]: value });
    }
=======
    setTempProfile({ ...tempProfile, [field]: value });
>>>>>>> origin/abusaid
  };

  // Save updated profile fields
  const saveProfile = async (field) => {
    if (!tempProfile[field] || tempProfile[field] === profile[field]) {
      setEditMode({ ...editMode, [field]: false });
      return;
    }

    try {
<<<<<<< HEAD
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3500/api/auth/update-student-profile",
        { [field]: tempProfile[field] },
=======
      setLoading({ ...loading, profile: true });
      const token = localStorage.getItem("token");
      
      // Format date back to DD/MM/YYYY if it's the date_of_birth field
      let valueToSend = tempProfile[field];
      if (field === "date_of_birth" && valueToSend.includes("-")) {
        const [year, month, day] = valueToSend.split("-");
        valueToSend = `${day}/${month}/${year}`;
      }

      const response = await axios.put(
        `http://localhost:3500/api/student/profile/${field}`,
        { [field]: valueToSend },
>>>>>>> origin/abusaid
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

<<<<<<< HEAD
      setProfile({ ...profile, [field]: tempProfile[field] });
      setEditMode({ ...editMode, [field]: false });
      toast.success(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully!`
      );
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(`Failed to update ${field}`);
=======
      // Update local state with the new value
      const updatedProfile = { ...profile, [field]: tempProfile[field] };
      setProfile(updatedProfile);
      setEditMode({ ...editMode, [field]: false });
      
      toast.success(`${field.replace(/_/g, ' ')} updated successfully!`);
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(err.response?.data?.message || `Failed to update ${field}`);
    } finally {
      setLoading({ ...loading, profile: false });
>>>>>>> origin/abusaid
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  // Submit new password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      setLoading(false);
=======
    setLoading({ ...loading, password: true });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      setLoading({ ...loading, password: false });
>>>>>>> origin/abusaid
      return;
    }

    try {
<<<<<<< HEAD
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3500/api/auth/change-student-password",
=======
      const token = localStorage.getItem("studentToken");
      await axios.put(
        "http://localhost:3500/api/student/profile/password",
>>>>>>> origin/abusaid
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);
    } catch (err) {
      console.error("Failed to change password:", err);
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
<<<<<<< HEAD
      setLoading(false);
=======
      setLoading({ ...loading, password: false });
>>>>>>> origin/abusaid
    }
  };

  // Handle profile photo change
<<<<<<< HEAD
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        profile_photo: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
=======
  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading({ ...loading, photo: true });
      const token = localStorage.getItem("studentToken");
      const formData = new FormData();
      formData.append("profile_photo", file);

      const response = await axios.put(
        "http://localhost:3500/api/student/profile/photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile({ ...profile, profile_photo: response.data.profile_photo });
      toast.success("Profile photo updated successfully!");
    } catch (err) {
      console.error("Failed to update profile photo:", err);
      toast.error("Failed to update profile photo");
    } finally {
      setLoading({ ...loading, photo: false });
>>>>>>> origin/abusaid
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-7xl mx-auto p-2">
=======
    <div className=" mx-auto px-4 py-8">
>>>>>>> origin/abusaid
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
<<<<<<< HEAD
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6"
      >
        {/* Header */}
        <div className="w-full mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 text-left">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and security settings
          </p>
        </div>

        {/* Profile Section */}
        <div className="p-2">
          <div className="flex items-center mb-8 ">
            <div className="relative mx-auto">
              <img
                src={profile.profile_photo || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-30 h-30 rounded-full object-cover border-2 border-gray-300"
              />
              <button
                onClick={() => document.getElementById("fileInput").click()}
                className="absolute bottom-0 right-0 p-2 bg-gray-700 text-white rounded-full"
              >
                <FiEdit2 size={16} />
              </button>
              <input
                type="file"
                id="fileInput"
                onChange={handleProfilePhotoChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {profile.full_name}
              </h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          <div className="space-y-6 p-4">
            {/* Full Name Field */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
=======
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and security settings
          </p>
        </div>

        <div className="p-6">
          {/* Profile Photo Section */}
          <div className="flex flex-col sm:flex-row items-center mb-8 gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                {profile.profile_photo ? (
                  <img
                    src={profile.profile_photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="text-gray-400" size={32} />
                )}
              </div>
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                title="Change photo"
              >
                <FiEdit2 size={16} />
                <input
                  type="file"
                  id="profilePhoto"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                  accept="image/*"
                  disabled={loading.photo}
                />
              </label>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {profile.full_name || "Student User"}
              </h2>
              <p className="text-gray-600">{profile.email}</p>
              <div className="mt-2 flex items-center justify-center sm:justify-start space-x-4 text-sm text-gray-500">
                <span>
                  Joined {profile.createdAt ? formatDate(profile.createdAt) : ""}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${profile.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {profile.isVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiUser className="mr-2" size={16} />
                  Full Name
                </label>
>>>>>>> origin/abusaid
                {editMode.full_name ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveProfile("full_name")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      disabled={loading.profile}
>>>>>>> origin/abusaid
                    >
                      <FiSave size={16} />
                    </button>
                    <button
                      onClick={() => handleEditToggle("full_name")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
>>>>>>> origin/abusaid
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditToggle("full_name")}
<<<<<<< HEAD
                    className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
=======
                    className="p-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
>>>>>>> origin/abusaid
                  >
                    <FiEdit2 size={16} />
                  </button>
                )}
              </div>
              {editMode.full_name ? (
                <input
                  type="text"
                  value={tempProfile.full_name || ""}
                  onChange={(e) => handleProfileChange(e, "full_name")}
<<<<<<< HEAD
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-gray-500 "
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">
                  {profile.full_name}
=======
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.full_name || "Not provided"}
>>>>>>> origin/abusaid
                </p>
              )}
            </div>

            {/* Email Field */}
<<<<<<< HEAD
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
=======
            <div className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiMail className="mr-2" size={16} />
                  Email Address
                </label>
>>>>>>> origin/abusaid
                {editMode.email ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveProfile("email")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      disabled={loading.profile}
>>>>>>> origin/abusaid
                    >
                      <FiSave size={16} />
                    </button>
                    <button
                      onClick={() => handleEditToggle("email")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
>>>>>>> origin/abusaid
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditToggle("email")}
<<<<<<< HEAD
                    className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
=======
                    className="p-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
>>>>>>> origin/abusaid
                  >
                    <FiEdit2 size={16} />
                  </button>
                )}
              </div>
              {editMode.email ? (
                <input
                  type="email"
                  value={tempProfile.email || ""}
                  onChange={(e) => handleProfileChange(e, "email")}
<<<<<<< HEAD
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-gray-500 "
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">
                  {profile.email}
                </p>
=======
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              ) : (
                <div>
                  <p className="text-gray-800">{profile.email}</p>
                  {!profile.isVerified && (
                    <p className="text-sm text-yellow-600 mt-1">
                      Your email is not verified. Please check your inbox for verification instructions.
                    </p>
                  )}
                </div>
>>>>>>> origin/abusaid
              )}
            </div>

            {/* Phone Field */}
<<<<<<< HEAD
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <FiPhone className="mr-2" size={14} />
                  Phone
                </h3>
=======
            <div className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiPhone className="mr-2" size={16} />
                  Phone Number
                </label>
>>>>>>> origin/abusaid
                {editMode.phone ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveProfile("phone")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      disabled={loading.profile}
>>>>>>> origin/abusaid
                    >
                      <FiSave size={16} />
                    </button>
                    <button
                      onClick={() => handleEditToggle("phone")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
>>>>>>> origin/abusaid
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditToggle("phone")}
<<<<<<< HEAD
                    className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
=======
                    className="p-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
>>>>>>> origin/abusaid
                  >
                    <FiEdit2 size={16} />
                  </button>
                )}
              </div>
              {editMode.phone ? (
                <input
                  type="tel"
                  value={tempProfile.phone || ""}
                  onChange={(e) => handleProfileChange(e, "phone")}
<<<<<<< HEAD
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-gray-500 "
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">
=======
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-gray-800">
>>>>>>> origin/abusaid
                  {profile.phone || "Not provided"}
                </p>
              )}
            </div>

            {/* Date of Birth Field */}
<<<<<<< HEAD
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <FiCalendar className="mr-2" size={14} />
                  Date of Birth
                </h3>
=======
            <div className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiCalendar className="mr-2" size={16} />
                  Date of Birth
                </label>
>>>>>>> origin/abusaid
                {editMode.date_of_birth ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveProfile("date_of_birth")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      disabled={loading.profile}
>>>>>>> origin/abusaid
                    >
                      <FiSave size={16} />
                    </button>
                    <button
                      onClick={() => handleEditToggle("date_of_birth")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
>>>>>>> origin/abusaid
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditToggle("date_of_birth")}
<<<<<<< HEAD
                    className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
=======
                    className="p-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
>>>>>>> origin/abusaid
                  >
                    <FiEdit2 size={16} />
                  </button>
                )}
              </div>
              {editMode.date_of_birth ? (
                <input
                  type="date"
<<<<<<< HEAD
                  value={tempProfile.date_of_birth || ""}
                  onChange={(e) => handleProfileChange(e, "date_of_birth")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-gray-500 "
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">
                  {profile.date_of_birth || "Not provided"}
=======
                  value={formatDateForInput(tempProfile.date_of_birth) || ""}
                  onChange={(e) => handleProfileChange(e, "date_of_birth")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">
                  {profile.date_of_birth
                    ? formatDateForInput(profile.date_of_birth)
                    : "Not provided"}
>>>>>>> origin/abusaid
                </p>
              )}
            </div>

            {/* Address Field */}
<<<<<<< HEAD
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <FiMapPin className="mr-2" size={14} />
                  Address
                </h3>
=======
            <div className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiMapPin className="mr-2" size={16} />
                  Address
                </label>
>>>>>>> origin/abusaid
                {editMode.address ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveProfile("address")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      disabled={loading.profile}
>>>>>>> origin/abusaid
                    >
                      <FiSave size={16} />
                    </button>
                    <button
                      onClick={() => handleEditToggle("address")}
<<<<<<< HEAD
                      className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
=======
                      className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
>>>>>>> origin/abusaid
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditToggle("address")}
<<<<<<< HEAD
                    className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
=======
                    className="p-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
>>>>>>> origin/abusaid
                  >
                    <FiEdit2 size={16} />
                  </button>
                )}
              </div>
              {editMode.address ? (
                <textarea
                  value={tempProfile.address || ""}
                  onChange={(e) => handleProfileChange(e, "address")}
<<<<<<< HEAD
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
=======
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
>>>>>>> origin/abusaid
                  rows={3}
                  placeholder="Enter your full address"
                />
              ) : (
<<<<<<< HEAD
                <p className="text-lg font-medium text-gray-800">
=======
                <p className="text-gray-800">
>>>>>>> origin/abusaid
                  {profile.address || "Not provided"}
                </p>
              )}
            </div>
<<<<<<< HEAD
          </div>

          {/* Password Change Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Password</h3>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FiLock className="mr-1" size={14} />
                {showPasswordChange ? "Hide" : "Change Password"}
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              {showPasswordChange
                ? "Enter your current and new password"
                : "Last changed 3 months ago"}
            </p>

            <AnimatePresence>
              {showPasswordChange && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-4 mt-4"
                  >
                    {/* Current Password */}
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-gray-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCurrentPassword ? (
                            <FiEye size={18} />
                          ) : (
                            <FiEyeOff size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength="6"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-gray-500  pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? (
                            <FiEye size={18} />
                          ) : (
                            <FiEyeOff size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-gray-500  pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <FiEye size={18} />
                          ) : (
                            <FiEyeOff size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowPasswordChange(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-200 hover:text-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
=======

            {/* Password Change Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FiLock className="mr-2" size={16} />
                  Password
                </label>
                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {showPasswordChange ? "Cancel" : "Change Password"}
                </button>
              </div>

              <AnimatePresence>
                {showPasswordChange && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-50 p-4 rounded-lg mt-3">
                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        {/* Current Password */}
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              id="currentPassword"
                              name="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility("current")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showCurrentPassword ? (
                                <FiEye size={18} />
                              ) : (
                                <FiEyeOff size={18} />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              id="newPassword"
                              name="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              required
                              minLength="6"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility("new")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showNewPassword ? (
                                <FiEye size={18} />
                              ) : (
                                <FiEyeOff size={18} />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Password must be at least 6 characters long
                          </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility("confirm")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showConfirmPassword ? (
                                <FiEye size={18} />
                              ) : (
                                <FiEyeOff size={18} />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={loading.password}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {loading.password ? "Updating..." : "Update Password"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
>>>>>>> origin/abusaid
          </div>
        </div>
      </motion.div>
    </div>
  );
};

<<<<<<< HEAD
export default Settings;
=======
export default StudentSettings;
>>>>>>> origin/abusaid
