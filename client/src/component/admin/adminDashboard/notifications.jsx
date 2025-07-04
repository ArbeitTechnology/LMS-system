/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3500/api/auth/notifications"
        );
        setNotifications(response.data.notifications); // Assumes response includes notifications data
      } catch (error) {
        toast.error("Failed to load notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Approve teacher
  const approveTeacher = async (teacherId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3500/api/auth/teacher-status/${teacherId}`,
        { status: "approved" }
      );

      if (response.data.success) {
        toast.success("Teacher approved successfully!");
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== teacherId)
        );
      }
    } catch (error) {
      toast.error("Error approving teacher");
    }
  };

  // Reject teacher
  const rejectTeacher = async (teacherId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3500/api/auth/teacher-status/${teacherId}`,
        { status: "rejected" }
      );

      if (response.data.success) {
        toast.success("Teacher rejected successfully!");
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== teacherId)
        );
      }
    } catch (error) {
      toast.error("Error rejecting teacher");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Teacher Registration Notifications
      </h2>
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-center justify-between p-4 border-b border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 text-white">
                  {notif.teacherName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{notif.teacherName}</span>
                  <span className="text-sm text-gray-500">
                    {notif.teacherEmail}
                  </span>
                  <span
                    className={`text-xs ${
                      notif.status === "pending"
                        ? "text-yellow-500"
                        : notif.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Status: {notif.status}
                  </span>
                </div>
              </div>
              {notif.status === "pending" && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => approveTeacher(notif.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FiCheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => rejectTeacher(notif.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiXCircle size={20} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
