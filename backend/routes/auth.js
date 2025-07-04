const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getAdmin,
  verifyOtp,
  adminGet,
  createSubAdmin,
  deleteSubAdmin,
  listSubAdmins,
  updateSubadminStatus,
  teacherregistration,
  teacherlogin,
  teacherforgotPassword,
  teacherverifyOtp,
  teacherresetPassword,
  notifications,
  approveTeacher
} = require("../controllers/auth");
const { authenticateToken, authorizeAdmin } = require("../middleware/auth");
const multer = require("multer");

router.get("/checkAdmin", getAdmin);
router.get("/admin", authenticateToken, adminGet);

// Admin-only routes
router.post("/subadmin", authenticateToken, authorizeAdmin, createSubAdmin);
router.delete(
  "/subadmin/:id",
  authenticateToken,
  authorizeAdmin,
  deleteSubAdmin
);
router.get("/subadmins", authenticateToken, authorizeAdmin, listSubAdmins);
router.put(
  "/subadmin/:id/status",
  authenticateToken,
  authorizeAdmin,
  updateSubadminStatus
);
// Public
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
// ----------------------teacher-registration------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./public/uploads/teachers";
    // Check if directory exists, if not, create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    // Initially, use a temporary name until teacher is saved and ID is available
    cb(null, `temp-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new AppError("Only PDF, JPEG, JPG, and PNG files are allowed!", 400),
      false
    );
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
// Handle multiple file uploads
const uploadFiles = upload.fields([
  { name: "cv", maxCount: 1 },
  { name: "certificates[]", maxCount: 5 }, // Note the [] for array
  { name: "profile_photo", maxCount: 1 }
]);

// ------------------------------teacher-------------------------------------
router.post("/teacher-register", uploadFiles, teacherregistration);
router.get("/notifications", authenticateToken, notifications);
router.patch("/teacher-status/:teacherId", authenticateToken, approveTeacher);
router.post("/teacher-login", teacherlogin);
router.post("/teacher-forget-password", teacherforgotPassword);
router.post("/teacher-verify-otp", teacherverifyOtp);
router.post("/teacher-reset-password", teacherresetPassword);

module.exports = router;
