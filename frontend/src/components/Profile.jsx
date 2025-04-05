import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser, deleteUser } from "../services/api.js";
import { logoutUser, setUser } from "../redux/userSlice";
import profileAvatar from "../assets/profile/profile_avatar.png";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please log in first!");
      navigate("/");
    }
  }, [user, navigate]);

  // Handle Input Changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle User Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUser(user._id, updatedUser); // Use updated API call
      dispatch(setUser(data.updatedUser)); // Dispatch with the updated user data
      toast.success("User updated successfully!");
      setIsEditing(false);
      navigate("/profile");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Error updating user");
    }
  };

  // Handle User Deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(user._id); // Use updated API call
        dispatch(logoutUser());
        toast.success("User deleted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Delete Error:", error);
        toast.error(error.response?.data?.message || "Error deleting user");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg rounded-lg border border-gray-800 flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="md:w-1/3 bg-gradient-to-r from-orange-400 to-pink-500 p-6 text-white rounded-t-lg md:rounded-l-lg flex flex-col items-center">
        <img
          src={profileAvatar}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-2 border-white"
        />
        <h2 className="text-lg font-bold">{user?.name || "User Name"}</h2>
        <p className="text-sm">{user?.role || "User Role"}</p>
      </div>

      {/* Right Panel */}
      <div className="md:w-2/3 p-6">
        <h2 className="text-xl font-bold mb-4">Information</h2>

        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={updatedUser.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className="mb-4">
              <p className="font-semibold">Email</p>
              <p className="text-gray-700">
                {user?.email || "example@gmail.com"}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Phone</p>
              <p className="text-gray-700">{user?.phone || "9876543210"}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Address</p>
              <p className="text-gray-700">{user?.address || "Your Address"}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
