import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineCheck } from "react-icons/hi2";
import { BACKEND_URL } from '../config';

const Profile = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setUserData({ name: data.userName, email: data.email, phone: data.phone || '' });
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

  const handleUpdateClick = () => setIsEditing(true);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const payload = {
      userName: userData.name,
      email: userData.email,
      phone: userData.phone,
      profileImage: profileImage,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      alert("Profile updated successfully!");
      setUserData({ name: updated.userName, email: updated.email, phone: updated.phone });
      if (updated.profileImage) setProfileImage(updated.profileImage);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BACKEND_URL}/deleteAccount`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
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

  const inputClasses = `w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
    isEditing 
      ? "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-900 dark:text-white" 
      : "bg-gray-50/50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
  }`;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 relative flex justify-center items-start">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-brand-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      </div>

      <div className="w-full max-w-2xl px-4 sm:px-6">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden" data-aos="fade-up">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-blue-500"></div>
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">Personal <span className="text-gradient">Profile</span></h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings</p>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <img
                src={profileImage}
                alt="Profile"
                className="relative w-36 h-36 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl"
              />
              {isEditing && (
                <label htmlFor="image-upload" className="absolute bottom-1 right-1 p-3 bg-brand-500 hover:bg-brand-600 rounded-full cursor-pointer shadow-lg transition-colors border-2 border-white dark:border-gray-800 text-white">
                  <input type="file" id="image-upload" onChange={handleImageChange} accept="image/*" className="hidden" />
                  <HiOutlinePencilSquare size={18} />
                </label>
              )}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5 mb-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Full Name</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                readOnly={!isEditing}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                readOnly={!isEditing}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Phone Number</label>
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                readOnly={!isEditing}
                placeholder="Not provided"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleDeleteAccount}
              className="w-full sm:w-auto px-6 py-3 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition duration-300 flex items-center justify-center gap-2 font-medium"
            >
              <HiOutlineTrash size={20} /> Delete Account
            </button>

            <div className="w-full sm:w-auto">
              {!isEditing ? (
                <button
                  onClick={handleUpdateClick}
                  className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl shadow-lg hover:bg-brand-600 dark:hover:bg-gray-200 transition duration-300 font-bold flex items-center justify-center gap-2"
                >
                  <HiOutlinePencilSquare size={20} /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSaveChanges}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-500 text-white rounded-xl shadow-lg hover:bg-brand-600 transition duration-300 font-bold flex items-center justify-center gap-2"
                >
                  <HiOutlineCheck size={20} /> Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
