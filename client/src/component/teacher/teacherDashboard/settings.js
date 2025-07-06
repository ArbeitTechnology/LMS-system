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
  FiFileText,
  FiLink,
  FiDollarSign
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const TeacherSettings = () => {
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    qualifications: "",
    linkedin_url: "",
    hourly_rate: "",
    profile_photo: null,
    cv: null,
    certificates: []
  });

  const [editMode, setEditMode] = useState({
    full_name: false,
    email: false,
    phone: false,
    specialization: false,
    qualifications: false,
    linkedin_url: false,
    hourly_rate: false
  });

  const [tempData, setTempData] = useState({});
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          "http://localhost:3500/api/auth/teacher",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setTeacherData({
          full_name: response.data.full_name || "Teacher Name",
          email: response.data.email || "teacher@example.com",
          phone: response.data.phone || "",
          specialization: response.data.specialization || "",
          qualifications: response.data.qualifications || "",
          linkedin_url: response.data.linkedin_url || "",
          hourly_rate: response.data.hourly_rate || "",
          profile_photo: response.data.profile_photo || null,
          cv: response.data.cv || null,
          certificates: response.data.certificates || []
        });
      } catch (error) {
        console.error("Failed to fetch profile data", error);
        toast.error("Failed to load teacher data");
      }
    };

    fetchTeacherProfile();
  }, []);

  const handleEditToggle = (field) => {
    if (editMode[field]) {
      setEditMode({ ...editMode, [field]: false });
    } else {
      setTempData({ ...teacherData });
      setEditMode({ ...editMode, [field]: true });
    }
  };

  const handleProfileChange = (e, field) => {
    setTempData({ ...tempData, [field]: e.target.value });
  };

  const saveProfile = async (field) => {
    if (!tempData[field] || tempData[field] === teacherData[field]) {
      setEditMode({ ...editMode, [field]: false });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3500/api/auth/update-teacher-profile",
        { [field]: tempData[field] },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTeacherData({ ...teacherData, [field]: tempData[field] });
      setEditMode({ ...editMode, [field]: false });
      toast.success(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } updated successfully!`
      );
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(`Failed to update ${field}`);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3500/api/auth/change-teacher-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setShowPasswordChange(false);
    } catch (err) {
      console.error("Failed to change password:", err);
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const fileList = Array.from(e.target.files);

    if (name === "certificates") {
      setTeacherData((prev) => ({
        ...prev,
        [name]: [...prev[name], ...fileList]
      }));
    } else {
      setTeacherData((prev) => ({ ...prev, [name]: fileList[0] }));
    }
  };

  const removeCertificate = (index) => {
    const updatedCertificates = [...teacherData.certificates];
    updatedCertificates.splice(index, 1);
    setTeacherData((prev) => ({ ...prev, certificates: updatedCertificates }));
  };
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

  return (
    <div className="max-w-7xl mx-auto p-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6"
      >
        <div className="w-full mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 text-left">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and security settings
          </p>
        </div>

        <div className="flex items-center mb-8">
          <div className="relative">
            <img
              src={
                teacherData.profile_photo || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
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
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {teacherData.full_name}
            </h2>
            <p className="text-gray-600">{teacherData.email}</p>
          </div>
        </div>

        <div className="space-y-6 p-4">
          {/* Full Name */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              {editMode.full_name ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveProfile("full_name")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FiSave size={16} />
                  </button>
                  <button
                    onClick={() => handleEditToggle("full_name")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("full_name")}
                  className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            {editMode.full_name ? (
              <input
                type="text"
                value={tempData.full_name || ""}
                onChange={(e) => handleProfileChange(e, "full_name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {teacherData.full_name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              {editMode.email ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveProfile("email")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FiSave size={16} />
                  </button>
                  <button
                    onClick={() => handleEditToggle("email")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("email")}
                  className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            {editMode.email ? (
              <input
                type="email"
                value={tempData.email || ""}
                onChange={(e) => handleProfileChange(e, "email")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {teacherData.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              {editMode.phone ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveProfile("phone")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FiSave size={16} />
                  </button>
                  <button
                    onClick={() => handleEditToggle("phone")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("phone")}
                  className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            {editMode.phone ? (
              <input
                type="text"
                value={tempData.phone || ""}
                onChange={(e) => handleProfileChange(e, "phone")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {teacherData.phone}
              </p>
            )}
          </div>

          {/* Specialization */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Specialization
              </h3>
              {editMode.specialization ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveProfile("specialization")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FiSave size={16} />
                  </button>
                  <button
                    onClick={() => handleEditToggle("specialization")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("specialization")}
                  className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            {editMode.specialization ? (
              <input
                type="text"
                value={tempData.specialization || ""}
                onChange={(e) => handleProfileChange(e, "specialization")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {teacherData.specialization}
              </p>
            )}
          </div>

          {/* Qualifications */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Qualifications
              </h3>
              {editMode.qualifications ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveProfile("qualifications")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FiSave size={16} />
                  </button>
                  <button
                    onClick={() => handleEditToggle("qualifications")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("qualifications")}
                  className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            {editMode.qualifications ? (
              <textarea
                value={tempData.qualifications || ""}
                onChange={(e) => handleProfileChange(e, "qualifications")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={4}
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {teacherData.qualifications}
              </p>
            )}
          </div>

          {/* LinkedIn URL */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                LinkedIn URL
              </h3>
              {editMode.linkedin_url ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveProfile("linkedin_url")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FiSave size={16} />
                  </button>
                  <button
                    onClick={() => handleEditToggle("linkedin_url")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("linkedin_url")}
                  className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            {editMode.linkedin_url ? (
              <input
                type="url"
                value={tempData.linkedin_url || ""}
                onChange={(e) => handleProfileChange(e, "linkedin_url")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {teacherData.linkedin_url}
              </p>
            )}
          </div>

          {/* Hourly Rate */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Hourly Rate</h3>
              {editMode.hourly_rate ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveProfile("hourly_rate")}
                    className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <FiSave size={16} />
                  </button>
                  <button
                    onClick={() => handleEditToggle("hourly_rate")}
                    className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("hourly_rate")}
                  className="p-1.5 rounded-full bg-gray-700 text-gray-100 hover:bg-black transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            {editMode.hourly_rate ? (
              <input
                type="number"
                value={tempData.hourly_rate || ""}
                onChange={(e) => handleProfileChange(e, "hourly_rate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {teacherData.hourly_rate}
              </p>
            )}
          </div>

          {/* Password Section */}
          <div>
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
                          type={showPasswordChange ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswordChange ? (
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
                          type={showPasswordChange ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength="6"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswordChange ? (
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
                          type={showPasswordChange ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswordChange ? (
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherSettings;
