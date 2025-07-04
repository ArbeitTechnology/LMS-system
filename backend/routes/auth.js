const express = require("express");
const router = express.Router();
const {register,login,forgotPassword,resetPassword,getAdmin,verifyOtp,adminGet,createSubAdmin,deleteSubAdmin,listSubAdmins, teacherregistration, teacherlogin, teacherforgotPassword, teacherverifyOtp, teacherresetPassword} = require("../controllers/auth");
const { authenticateToken, authorizeAdmin } = require("../middleware/auth");
const multer=require("multer")



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

// Public
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
// ----------------------teacher-registration------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/teachers');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `teacher-${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new AppError('Only PDF, JPEG, JPG, and PNG files are allowed!', 400), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
// Handle multiple file uploads
const uploadFiles = upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'certificates', maxCount: 5 },
  { name: 'profile_photo', maxCount: 1 }
]);

// ------------------------------teacher-------------------------------------
router.post('/teacher-register', uploadFiles,teacherregistration);
router.post('/teacher-login',teacherlogin);
router.post('/teacher-forget-password',teacherforgotPassword);
router.post('/teacher-verify-otp',teacherverifyOtp);
router.post('/teacher-reset-password',teacherresetPassword);

module.exports = router;
