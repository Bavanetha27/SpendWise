import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { FaSun, FaMoon } from "react-icons/fa"; // Import theme icons

const Profile = ({ darkMode, toggleTheme }) => {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150" // Default profile image
  );

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Trigger animation only once
    });
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the selected image as the profile image
      };
      reader.readAsDataURL(file); // Convert the image to base64 format
      setImageFile(file); // Set the selected file
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center p-24 bg-gray-50 dark:bg-gray-900 transition-colors`}>
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12" data-aos="fade-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">Your Profile</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your personal information</p>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-indigo-600 shadow-xl"
              data-aos="fade-right"
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full cursor-pointer shadow-lg">
              <input
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
            </label>
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">Full Name</span>
            <span className="text-gray-800 dark:text-gray-200">John Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">Email</span>
            <span className="text-gray-800 dark:text-gray-200">johndoe@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">Phone</span>
            <span className="text-gray-800 dark:text-gray-200">+1 234 567 890</span>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 transition duration-300">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
