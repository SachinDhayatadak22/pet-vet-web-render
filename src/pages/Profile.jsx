import React, { useState } from "react";
// import hocUserTwo from "../images/user/hoc-user-two.png";
import { useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { apiPOST, apiPUT } from "../utils/apiHelper";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    profilePic: "https://ibb.co/3Sr3D8k",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });

    if (name === "confirmPassword" && value !== passwords.newPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match." });
    } else if (name === "newPassword" && !passwordRegex.test(value)) {
      setErrors({
        ...errors,
        newPassword:
          "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleUserUpdate = async () => {
    try {
      const response = await apiPUT(`/v1/users/update-profile/${user?.id}`, userDetails);
      if (response.status === 200) {
        toast.success("User details updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred while updating user details");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match." });
      return;
    }

    if (!passwordRegex.test(passwords.newPassword)) {
      setErrors({
        ...errors,
        newPassword:
          "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
      });
      return;
    }

    try {
      const response = await apiPUT(`/v1/users/reset-password/${user?.id}`, {
        currentPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      if (response.status === 200) {
        toast.success("Password updated successfully");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred while updating password");
    }
  };

  return (
    <div className="m-3 lg:ml-0">
      <div className="text-textcolor">
        <h1 className="text-xl font-semibold">Profile</h1>

        {/* User Details Form */}
        <div className="bg-white mt-2 p-6 rounded-lg">
          <div className="flex justify-center mt-6 mb-9">
            <img
              src={hocUserTwo}
              alt="User Profile"
              className="w-20 h-20 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["firstName", "lastName"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium"
                >
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  placeholder={field === "firstName" ? "First Name" : "Last Name"}
                  value={userDetails[field]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border-2 border-bordergray focus:outline-none rounded-lg bg-gray-100 focus:border-secondary"
                />
              </div>
            ))}
            <div >
              <label className="block text-sm font-medium"                >
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                viewOnly              
                value={user?.email}
                className="mt-1 block w-full p-2 border-2 bg-primary border-bordergray focus:outline-none rounded-lg bg-gray-100 focus:border-secondary"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleUserUpdate}
              className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
            >
              Update User Details
            </button>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-white mt-3 p-6 rounded-lg">
          <h2 className="text-lg font-medium">Change Password</h2>
          <form onSubmit={handlePasswordUpdate}>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium">
                    {field === "oldPassword"
                      ? "Old Password"
                      : field === "newPassword"
                        ? "New Password"
                        : "Confirm Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword[field] ? "text" : "password"}
                      id={field}
                      name={field}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                      value={passwords[field]}
                      onChange={handlePasswordChange}
                      className={`mt-1 block w-full p-2 border-2 ${errors[field] ? "border-red-500" : "border-bordergray"
                        } rounded-lg focus:outline-none focus:ring-secondary focus:border-secondary`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowPassword(field)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      {showPassword[field] ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-600 text-white mt-8 py-2 px-6 rounded-full hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
