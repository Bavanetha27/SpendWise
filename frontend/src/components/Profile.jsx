import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("User not logged in");

    try {
      const res = await fetch("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();

      setUserData({
        name: data.userName,
        email: data.email,
        phone: data.phone,
      });

      if (data.profileImage) setProfileImage(data.profileImage);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const payload = {
      userName: userData.name,
      email: userData.email,
      phone: userData.phone,
      profileImage: profileImage,
    };

    try {
      const res = await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      alert("Profile updated successfully!");
      setUserData({
        name: updated.userName,
        email: updated.email,
        phone: updated.phone,
      });
      if (updated.profileImage) setProfileImage(updated.profileImage);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/deleteAccount", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete account");

      alert("Account deleted successfully!");
      localStorage.removeItem("token");
      window.location.href = "/"; 
    } catch (err) {
      console.error("Delete account error:", err);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-12 sm:px-6 lg:px-24 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10" data-aos="fade-up">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 dark:text-indigo-300">Your Profile</h2>
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
            {isEditing && (
              <label htmlFor="image-upload" className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full cursor-pointer shadow-lg">
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
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 mt-1 rounded-md border ${
                isEditing ? "bg-white dark:bg-gray-700 dark:text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 mt-1 rounded-md border ${
                isEditing ? "bg-white dark:bg-gray-700 dark:text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Phone</label>
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 mt-1 rounded-md border ${
                isEditing ? "bg-white dark:bg-gray-700 dark:text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {!isEditing ? (
            <button
              onClick={handleUpdateClick}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 transition duration-300"
            >
              Update Profile
            </button>
          ) : (
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
            >
              Save Changes
            </button>
          )}
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-500 transition duration-300"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
