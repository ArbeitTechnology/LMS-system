/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiDollarSign,
  FiYoutube,
  FiShoppingCart,
  FiCheck,
  FiStar,
  FiFilter,
  FiSearch,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const CourseList = ({ setActiveView }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolling, setEnrolling] = useState(false);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const studnetdata=JSON.parse(localStorage.getItem("studentData"));
  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${base_url}/api/student/all-courses`);
        const data = await response.json();
        
        if (data.success) {
          const formattedCourses = data.courses.map(course => ({
            id: course._id,
            title: course.title || course.name || 'Untitled Course',
            description: course.description || 'No description available',
            thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            instructor: course.instructor || 'Unknown Instructor',
            rating: course.rating || 4.5,
            students: course.students || course.enrolledStudents || 0,
            duration: course.duration || 'Unknown duration',
            price: course.price || 0,
            type: course.price > 0 ? 'premium' : 'free'
          }));
          
          setCourses(formattedCourses);
          setFilteredCourses(formattedCourses);
        } else {
          toast.error(data.message || 'Failed to load courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("courseCart")) || [];
    setCart(savedCart);

    // // Load enrolled courses from API
    // const fetchEnrolledCourses = async () => {
    //   try {
    //     const response = await fetch(`${base_url}/api/student/my-courses`, {
    //       headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    //       }
    //     });
    //     const data = await response.json();
    //     if (data.success) {
    //       setEnrolledCourses(data.enrolledCourses.map(c => c.course._id));
    //     }
    //   } catch (error) {
    //     console.error('Error fetching enrolled courses:', error);
    //   }
    // };

    // if (localStorage.getItem('token')) {
    //   fetchEnrolledCourses();
    // }
  }, []);

  // Filter courses based on search and price filter
  useEffect(() => {
    let results = courses;

    if (searchTerm) {
      results = results.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter === "free") {
      results = results.filter((course) => course.price === 0);
    } else if (priceFilter === "paid") {
      results = results.filter((course) => course.price > 0);
    }

    setFilteredCourses(results);
  }, [searchTerm, priceFilter, courses]);

  // Add to cart function
  const addToCart = (course) => {
    if (cart.some((item) => item.id === course.id)) {
      toast.error("Course already in cart");
      return;
    }

    if (course.price === 0) {
      enrollCourse(course.id);
      return;
    }

    const updatedCart = [...cart, course];
    setCart(updatedCart);
    localStorage.setItem("courseCart", JSON.stringify(updatedCart));
    toast.success("Course added to cart");
  };

  // Remove from cart function
  const removeFromCart = (courseId) => {
    const updatedCart = cart.filter((item) => item.id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("courseCart", JSON.stringify(updatedCart));
    toast.success("Course removed from cart");
  };

  // Enroll course function
 // Enroll course function using Axios
const enrollCourse = async (courseId) => {
  if (enrolling) return;
  
  try {
    setEnrolling(true);
    
    // Check if already enrolled locally first
    if (enrolledCourses.includes(courseId)) {
      toast.error("You're already enrolled in this course");
      return;
    }

    // Make API call to enroll using Axios
    const response = await axios.post(
      `${base_url}/api/student/enroll/${courseId}`,
      { userid: studnetdata.id },  // request body
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('studentToken')}`
        }
      }
    );

    // With Axios, response data is automatically parsed and available in response.data
    // No need to check response.ok - Axios throws errors for non-2xx status codes

    // Update local state if API call succeeds
    setEnrolledCourses([...enrolledCourses, courseId]);
    toast.success("Successfully enrolled in course!");
    
    // Optionally navigate to the course
    // navigate(`/learn/${courseId}`);

  } catch (error) {
    console.error('Enrollment error:', error);
    // Axios wraps the response error in error.response
    const errorMessage = error.response?.data?.message || error.message || 'Failed to enroll in course';
    toast.error(errorMessage);
  } finally {
    setEnrolling(false);
  }
};
  // Check if course is in cart
  const isInCart = (courseId) => {
    return cart.some((item) => item.id === courseId);
  };

  // Check if course is enrolled
  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen text-gray-900 p-0">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white py-4 sm:py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">Courses</h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setActiveView("myCourses")}
              className="relative p-1 sm:p-2 rounded-full hover:bg-gray-100"
              aria-label="My Courses"
            >
              <FiBookOpen className="text-lg sm:text-xl" />
              {enrolledCourses.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {enrolledCourses.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveView("cart")}
              className="relative p-1 sm:p-2 rounded-full hover:bg-gray-100"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="text-lg sm:text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:border-gray-500 hover:border-gray-500 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <FiFilter className="text-gray-500 mr-1 sm:mr-2 text-sm sm:text-base" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:border-gray-500 hover:border-gray-500 text-sm sm:text-base"
                >
                  <option value="all">All Courses</option>
                  <option value="free">Free Courses</option>
                  <option value="paid">Premium Courses</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="h-40 sm:h-48 bg-gray-200"></div>
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-lg shadow border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div>
                  <div className="relative">
                    <img
                      src={course.thumbnail?.filename ? 
                           `${base_url}/uploads/courses/${course.thumbnail.filename}` : 
                           course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 text-xs rounded">
                      {course.price === 0 ? "FREE" : `৳${course.price}`}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <h3 className="text-base sm:text-lg font-bold mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p 
                      className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: course.description }} 
                    />
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
                      <span className="flex items-center">
                        <FiStar className="mr-1 text-yellow-400" />{" "}
                        {course.rating}
                      </span>
                      <span className="flex items-center">
                        <FiUsers className="mr-1" />{" "}
                        {course.students.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-1" /> {course.duration}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 mb-2">
                      By {course.instructor}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0">
                  {isEnrolled(course.id) ? (
                    <button
                      onClick={() => navigate(`/learn/${course.id}`)}
                      className="w-full bg-gray-900 text-white py-1 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-all"
                    >
                      Continue Learning
                    </button>
                  ) : course.price === 0 ? (
                    <button
                      onClick={() => enrollCourse(course.id)}
                      disabled={enrolling}
                      className={`w-full bg-gray-900 text-white py-1 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition-all ${
                        enrolling ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                  ) : isInCart(course.id) ? (
                    <button
                      onClick={() => removeFromCart(course.id)}
                      className="w-full bg-red-100 text-red-700 py-1 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-red-200 flex items-center justify-center"
                    >
                      <FiShoppingCart className="mr-1 sm:mr-2" /> Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(course)}
                      className="w-full bg-gray-900 text-white py-1 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 flex items-center justify-center"
                    >
                      <FiShoppingCart className="mr-1 sm:mr-2" /> Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <FiBookOpen className="text-gray-400 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
              No courses found
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseList;