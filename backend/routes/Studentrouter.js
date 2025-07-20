const express = require('express');
const Studentrouter = express.Router();
const studentAuth = require('../middleware/studentMiddleware');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const Course = require('../models/Course');

// Protected route - Get student profile
Studentrouter.get('/profile/:id', studentAuth, async (req, res) => {
  try {
    const matchedstudent = await Student.findById(req.params.id)
      .select('-password -otp -otpExpires -resetPasswordToken -resetPasswordExpire -loginAttempts -lockUntil');
    
    if (!matchedstudent) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    // Verify the requesting student has permission to view this profile
    if (req.student._id.toString() !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this profile.' });
    }

    res.status(200).json({ success: true, student: matchedstudent });  
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Protected route - Update student profile (excluding password)
Studentrouter.put('/profile/:id', studentAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { email, full_name, phone, date_of_birth, address } = req.body;

    // Verify the requesting student has permission to update this profile
    if (req.student._id.toString() !== id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this profile.' });
    }

    // Find the student
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    // Prepare update data (exclude sensitive fields)
    const updateData = {};
    if (email && email !== student.email) {
      updateData.email = email;
      updateData.isVerified = false; // Reset verification if email changes
    }
    if (full_name) updateData.full_name = full_name;
    if (phone) updateData.phone = phone;
    if (date_of_birth) updateData.date_of_birth = date_of_birth;
    if (address) updateData.address = address;

    // Update the student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -otp -otpExpires -resetPasswordToken -resetPasswordExpire -loginAttempts -lockUntil');

    res.status(200).json({ success: true, student: updatedStudent });
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Protected route - Update student password
Studentrouter.put('/profile/:id/password', studentAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Verify the requesting student has permission to update this password
    if (req.student._id.toString() !== id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this password.' });
    }

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    // Find the student
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);
    await student.save();

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



// ------------------------------all-courses--------------------------------
Studentrouter.get('/all-courses', async (req, res) => {
  try {
    const allcourses=await Course.find();

    if(!allcourses){
      return res.send({success:false,message:"No courses found!"})
    }
    res.status(200).json({ success: true, courses: allcourses });  
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// @access  Private (Student)
Studentrouter.post('/enroll/:courseId', async (req, res) => {
  try {
    // Get the course
    const course = await Course.findById(req.params.courseId);
    console.log(req.body.userid)
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Get the student (assuming student ID is in req.user from auth middleware)
    const student = await Student.findById(req.body.userid);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check if already enrolled
    const isEnrolled = student.enrolledCourses.some(
      c => c.course.toString() === req.params.courseId
    );
    if (isEnrolled) {
      return res.status(400).json({ 
        success: false, 
        message: 'You are already enrolled in this course' 
      });
    }

    // Enroll the student using the method we defined in the model
    await student.enrollCourse(req.params.courseId);

    res.status(200).json({ 
      success: true, 
      message: 'Successfully enrolled in the course',
      enrolledCourses: student.enrolledCourses
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});
// Get enrolled courses for a student
Studentrouter.get("/my-courses", async (req, res) => {
  try {
    // Populate the enrolledCourses with course details
    const student = await Student.findById(req.student._id)
      .populate({
        path: 'enrolledCourses.course',
        select: 'title description thumbnail instructor rating duration price'
      })
      .select('enrolledCourses');

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Format the response
    const enrolledCourses = student.enrolledCourses.map(enrollment => ({
      course: {
        id: enrollment.course._id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        thumbnail: enrollment.course.thumbnail,
        instructor: enrollment.course.instructor,
        rating: enrollment.course.rating,
        duration: enrollment.course.duration,
        price: enrollment.course.price
      },
      enrolledAt: enrollment.enrolledAt,
      progress: enrollment.progress,
      completed: enrollment.completed,
      lastAccessed: enrollment.lastAccessed,
      certificates: enrollment.certificates
    }));

    res.status(200).json({
      success: true,
      enrolledCourses,
      count: enrolledCourses.length
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch enrolled courses", 
      error: error.message 
    });
  }
});

module.exports = Studentrouter;