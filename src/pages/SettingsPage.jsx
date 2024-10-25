import React, { useState } from 'react';
import { useUserStore } from '../store/useUserStore';

const ProfilePage = () => {
  const { user, changeUsername, changePassword, loading } = useUserStore(); // Access user, change functions, and loading state

  // State for username and password updates
  const [newName, setNewName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle username update
  const handleUpdateName = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await changeUsername(newName);
      setMessage('Username updated successfully');
    } catch (err) {
      setError(err.message || 'Error updating name');
    }
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await changePassword(currentPassword, newPassword);
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Error updating password');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-emerald-400 mb-8">Profile</h1>

      <div className="bg-grey shadow-md rounded-lg p-6 max-w-3xl mx-auto">

        {/* User Details */}
        <h2 className="text-2xl font-semibold text-emerald-400 mb-8">Your Details</h2>
        <div className="space-y-4 text-lg">
          <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
        </div>

        {/* Form to update username */}
        <form onSubmit={handleUpdateName} className="mt-8">
          <h3 className="text-xl font-semibold m-1 text-emerald-400">Update Username</h3>
          <div className="space-y-4">
            <input 
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 rounded w-full text-black"
              placeholder="Enter new name"
            />
            <button 
              type="submit" 
              className="bg-emerald-400 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Username'}
            </button>
          </div>
        </form>

        {/* Form to update password */}
        <form onSubmit={handleUpdatePassword} className="mt-8">
          <h3 className="text-xl font-semibold m-1 text-emerald-400">Update Password</h3>
          <div className="space-y-4">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border p-4 rounded w-full text-black"
              placeholder="Current password"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-4 rounded w-full text-black"
              placeholder="New password"
            />
            <button
              type="submit"
              className="bg-emerald-400 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>

        {/* Display success or error messages */}
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
