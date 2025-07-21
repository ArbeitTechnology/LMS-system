const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
<<<<<<< HEAD
const { v4: uuidv4 } = require("uuid");

const studentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function (v) {
          return /\d/.test(v) && /[!@#$%^&*]/.test(v);
        },
        message:
          "Password must contain at least one number and one special character",
      },
      select: false,
    },
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      validate: {
        validator: function (v) {
          return v.trim().split(/\s+/).length >= 2;
        },
        message: "Must include first and last name",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      validate: {
        validator: function (v) {
          return /^\+[1-9]\d{1,14}$/.test(v);
        },
        message: "Include country code (e.g., +880)",
      },
    },
    date_of_birth: {
      type: Date,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return v instanceof Date && !isNaN(v);
        },
        message: "Invalid date format",
      },
    },
    address: {
      type: String,
    },
    profile_photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
    last_login: {
      type: Date,
    },
    password_changed_at: {
      type: Date,
    },
    password_reset_token: {
      type: String,
    },
    password_reset_expires: {
      type: Date,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    is_active: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    resetCode: {
      type: String,
    },
    resetCodeExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Password hashing middleware
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.password_changed_at = Date.now() - 1000; // Ensures token is created after password change
  next();
});

// Method to compare passwords
studentSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if password was changed after token was issued
studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.password_changed_at) {
    const changedTimestamp = parseInt(
      this.password_changed_at.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Method to create password reset token
studentSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.password_reset_expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
=======

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    full_name: {
      type: String,
      required: [true, "Please enter your full name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"]
    },
    date_of_birth: {
      type: String,
      match: [/^\d{2}\/\d{2}\/\d{4}$/, "Date of birth must be in DD/MM/YYYY format"]
    },
    address: {
      type: String,
      trim: true,
      maxlength: [200, "Address cannot exceed 200 characters"]
    },
    profile_picture: {
      type: String,
      default: "default_profile.jpg"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: "student",
      enum: ["student", "admin"]
    },
    otp: {
      type: String,
      select: false
    },
    otpExpires: {
      type: Date,
      select: false
    },
    resetPasswordToken: {
      type: String,
      select: false
    },
    resetPasswordExpire: {
      type: Date,
      select: false
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    lockUntil: {
      type: Date,
      select: false
    },
    enrolledCourses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
          required: true
        },
        enrolledAt: {
          type: Date,
          default: Date.now
        },
        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100
        },
        completed: {
          type: Boolean,
          default: false
        },
        lastAccessed: {
          type: Date
        },
        certificates: [
          {
            url: String,
            issuedAt: Date,
            expiresAt: Date
          }
        ]
      }
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    learningGoals: {
      type: String,
      maxlength: [500, "Learning goals cannot exceed 500 characters"]
    },
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
      }
    ],
    skills: [String],
    preferences: {
      notificationEnabled: {
        type: Boolean,
        default: true
      },
      darkMode: {
        type: Boolean,
        default: false
      },
      language: {
        type: String,
        default: "english"
      }
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals
studentSchema.virtual('isLocked').get(function() {
  return this.lockUntil && this.lockUntil > Date.now();
});

studentSchema.virtual('enrolledCoursesCount').get(function() {
  return this.enrolledCourses.length;
});

// Middleware
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Methods
studentSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return otp;
};

studentSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  
  return resetToken;
};

studentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

studentSchema.methods.incrementLoginAttempts = function() {
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCK_TIME = 30 * 60 * 1000; // 30 minutes
  
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }
  
  return this.updateOne(updates);
};

// Enrollment Methods
studentSchema.methods.enrollCourse = async function(courseId) {
  const isEnrolled = this.enrolledCourses.some(c => c.course.toString() === courseId.toString());
  
  if (isEnrolled) {
    throw new Error('You are already enrolled in this course');
  }

  this.enrolledCourses.push({
    course: courseId,
    progress: 0,
    completed: false
  });

  await this.save();
  return this;
};

studentSchema.methods.updateCourseProgress = async function(courseId, progress) {
  const enrollment = this.enrolledCourses.find(
    c => c.course.toString() === courseId.toString()
  );

  if (!enrollment) {
    throw new Error('You are not enrolled in this course');
  }

  enrollment.progress = Math.min(progress, 100);
  enrollment.lastAccessed = Date.now();
  
  if (progress >= 100) {
    enrollment.completed = true;
  }

  await this.save();
  return this;
};

studentSchema.methods.addToWishlist = async function(courseId) {
  if (this.wishlist.includes(courseId)) {
    throw new Error('Course already in wishlist');
  }

  this.wishlist.push(courseId);
  await this.save();
  return this;
};

studentSchema.methods.removeFromWishlist = async function(courseId) {
  this.wishlist = this.wishlist.filter(id => id.toString() !== courseId.toString());
  await this.save();
  return this;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
>>>>>>> origin/abusaid
