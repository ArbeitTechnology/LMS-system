const express = require("express");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Studnetauth = express.Router();

<<<<<<< HEAD
// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "10d",
  });
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify Your Student Account",
    text: `Your OTP for account verification is: ${otp}\nThis OTP will expire in 10 minutes.`,
    html: `
      <div>
        <h3>Account Verification</h3>
        <p>Your OTP for account verification is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetURL) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your Password Reset Token (Valid for 10 min)",
    text: `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}\nIf you didn't forget your password, please ignore this email!`,
    html: `
      <div>
        <h3>Password Reset Request</h3>
        <p>Forgot your password? Click the link below to reset it:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>This link will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Student Registration
Studnetauth.post("/register", async (req, res) => {
  try {
    const { email, password, full_name, phone } = req.body;
    console.log(req.body)
    // Check if student already exists
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({
        status: "fail",
        message: "Student already exists with this email",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Create new student (not verified yet)
    const newStudent = await Student.create({
=======
// Configuration
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";
const OTP_EXPIRY_MINUTES = 10;
const RESET_TOKEN_EXPIRY_MINUTES = 30;

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "tausifrahman02@gmail.com",
    pass: process.env.EMAIL_PASS || "uxcc zkkr etre uipd",
  },
});

// Helper functions
const generateOTP = () => crypto.randomInt(100000, 999999).toString();
const generateToken = (payload, expiresIn) => jwt.sign(payload, JWT_SECRET, { expiresIn });

// Student Registration with OTP
Studnetauth.post("/register", async (req, res) => {
  try {
    const { email, password, full_name, phone, date_of_birth, address } = req.body;

    // Validate required fields
    if (!email || !password || !full_name || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if student exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { phone }] });
    if (existingStudent) {
      const field = existingStudent.email === email ? "email" : "phone";
      return res.status(400).json({ message: `${field} already in use` });
    }

    // Create and save student
    const student = new Student({
>>>>>>> origin/abusaid
      email,
      password,
      full_name,
      phone,
<<<<<<< HEAD
      otp,
      otpExpires,
      is_active: "inactive",
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    // Don't send password in response
    newStudent.password = undefined;

    res.status(201).json({
      status: "success",
      message: "OTP sent to your email for verification",
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
=======
      date_of_birth,
      address,
    });

    // Generate and save OTP
    const otp = student.generateOTP();
    await student.save();

    // Send OTP email
    await transporter.sendMail({
      from: `"Education App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Account",
      html: `Your verification OTP is: <strong>${otp}</strong>. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
    });

    res.status(201).json({
      message: "Registration successful. Please verify your account with the OTP sent to your email.",
      email: student.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
>>>>>>> origin/abusaid
  }
});

// Verify OTP
Studnetauth.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
<<<<<<< HEAD

    // Find student with this email and OTP
    const student = await Student.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!student) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid OTP or OTP expired",
      });
    }

    // Mark as verified
    student.is_active = "active";
    student.otp = undefined;
    student.otpExpires = undefined;
    await student.save({ validateBeforeSave: false });

    // Generate JWT token
    const token = signToken(student._id);

    res.status(200).json({
      status: "success",
      message: "Account verified successfully",
      token,
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
=======
    console.log(req.body)
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }
    console.log(student)
   // Debug logging (remove in production)
    console.log(`Stored OTP: ${student.otp}, Received OTP: ${otp}`);
    console.log(`OTP Expires: ${student.otpExpires}, Current Time: ${new Date()}`);

    // Check if OTP exists and not expired
    if (!student.otp || !student.otpExpires) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // Check expiration first
    if (student.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Compare OTPs (ensure both are strings)
    if (student.otp.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark as verified
    student.isVerified = true;
    student.otp = undefined;
    student.otpExpires = undefined;
    await student.save();

    // Generate auth token
    const token = generateToken(
      { id: student._id, role: student.role },
      "1h"
    );

    res.status(200).json({
      message: "Account verified successfully",
      token,
      student: {
        id: student._id,
        email: student.email,
        full_name: student.full_name,
        role: student.role,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
});

// Resend OTP
Studnetauth.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.isVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // Generate new OTP
    const otp = student.generateOTP();
    await student.save();

    // Send OTP email
    await transporter.sendMail({
      from: `"Education App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "New Verification OTP",
      html: `Your new verification OTP is: <strong>${otp}</strong>. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
    });

    res.status(200).json({ message: "New OTP sent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Failed to resend OTP", error: error.message });
>>>>>>> origin/abusaid
  }
});

// Student Login
Studnetauth.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    const student = await Student.findOne({ email }).select("+password");

    if (!student || !(await student.correctPassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    if (student.is_active !== "active") {
      return res.status(401).json({
        status: "fail",
=======
    // Find student with password
    const student = await Student.findOne({ email });
    console.log(student)
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if account is locked
    if (student.isLocked) {
      const remainingTime = Math.ceil((student.lockUntil - Date.now()) / (60 * 1000));
      return res.status(403).json({
        message: `Account locked. Try again in ${remainingTime} minutes.`,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password,student.password);
    if (!isMatch) {
      // Increment failed attempts
      await student.incrementLoginAttempts();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if email is verified
    if (!student.isVerified) {
      return res.status(403).json({
>>>>>>> origin/abusaid
        message: "Account not verified. Please verify your email first.",
      });
    }

<<<<<<< HEAD
    const token = signToken(student._id);

    student.last_login = Date.now();
    await student.save({ validateBeforeSave: false });

    student.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Student Forget Password
Studnetauth.post("/student-forget-password", async (req, res) => {
  const { email } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "If this email is registered, you'll receive a reset OTP.",
      });
    }

    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    student.resetCode = resetCode;
    student.resetCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await student.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Student Portal Password Reset OTP",
      text: `Your password reset OTP is: ${resetCode}\nThis code will expire in 10 minutes.`,
      html: `
        <div>
          <h3>Student Portal Password Reset</h3>
          <p>Your password reset OTP is: <strong>${resetCode}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent to registered email.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      error: "Could not process request. Please try again.",
    });
  }
});

// Student Verify OTP
Studnetauth.post("/student-verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const student = await Student.findOne({
      email,
      resetCode: otp,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please request a new one.",
      });
    }

    res.json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      error: "Could not verify OTP. Please try again.",
    });
  }
});

// Student Reset Password
Studnetauth.post("/student-reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find student with valid OTP
    const student = await Student.findOne({
      email,
      resetCode: otp,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!student) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired OTP. Please start the reset process again.",
      });
    }

    // Validate new password
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (!/\d/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one number",
      });
    }

    if (!/[!@#$%^&*]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one special character",
      });
    }

    // Hash and save new password
    student.password = await bcrypt.hash(newPassword, 12);
    student.resetCode = undefined;
    student.resetCodeExpires = undefined;
    await student.save();

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Has Been Reset",
      text: "Your student portal password has been successfully reset.",
      html: `
        <div>
          <h3>Password Reset Confirmation</h3>
          <p>Your student portal password has been successfully reset.</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      error: "Could not reset password. Please try again.",
    });
  }
});

module.exports = Studnetauth;
=======
    // Reset login attempts on successful login
    if (student.loginAttempts > 0 || student.lockUntil) {
      student.loginAttempts = 0;
      student.lockUntil = undefined;
      await student.save();
    }

    // Generate token
    const token = generateToken(
      { id: student._id, role: student.role },
      "1h"
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        email: student.email,
        full_name: student.full_name,
        role: student.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Forgot Password
Studnetauth.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      // Don't reveal whether email exists for security
      return res.status(200).json({ message: "If an account exists, a reset OTP has been sent" });
    }

    // Generate OTP
    const otp = student.generateOTP();
    await student.save();

    // Send OTP email
    await transporter.sendMail({
      from: `"Education App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `Your password reset OTP is: <strong>${otp}</strong>. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
    });

    res.status(200).json({
      message: "If an account exists, a reset OTP has been sent",
      email: student.email,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Password reset failed", error: error.message });
  }
});

// Reset Password with OTP
Studnetauth.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find student
    const student = await Student.findOne({ email }).select("+otp +otpExpires");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Verify OTP
    if (!student.verifyOTP(otp)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update password
    student.password = newPassword;
    student.otp = undefined;
    student.otpExpires = undefined;
    await student.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Password reset failed", error: error.message });
  }
});

// Middleware to protect routes
const authenticateStudent = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    req.student = student;
    req.token = token;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

// Protected routes
Studnetauth.get("/profile", authenticateStudent, async (req, res) => {
  try {
    res.status(200).json({
      student: {
        id: req.student._id,
        email: req.student.email,
        full_name: req.student.full_name,
        phone: req.student.phone,
        date_of_birth: req.student.date_of_birth,
        address: req.student.address,
        role: req.student.role,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
});

// Change Password
Studnetauth.post("/change-password", authenticateStudent, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isMatch = await req.student.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update password
    req.student.password = newPassword;
    await req.student.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Failed to change password", error: error.message });
  }
});

module.exports = Studnetauth;
>>>>>>> origin/abusaid
