import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfile = () => {
  const [form, setForm] = useState({
    userName: "",
    oldEmail: "",
    newEmail: "",
    phone: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch the current user profile
  const fetchProfile = async (newToken = null) => {
    const authToken = newToken || token;
    try {
      const response = await axios.get("http://localhost:4000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.success) {
        const { userName, email, phone } = response.data.user;
        setForm({ ...form, userName, oldEmail: email, phone });
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update user details
  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:4000/api/user/updateDetails",
        {
          userName: form.userName,
          oldEmail: form.oldEmail,
          newEmail: form.newEmail,
          phone: form.phone,
          password: form.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Profile updated successfully");
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem("authToken", newToken);

        // Clear newEmail and password fields
        setForm({ ...form, newEmail: "", password: "" });

        fetchProfile(newToken); // Refresh profile with new token
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Profile</h2>
      {/* Error Message Container */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={updateProfile} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="oldEmail" className="form-label">
            Old Email:
          </label>
          <input
            type="email"
            id="oldEmail"
            name="oldEmail"
            value={form.oldEmail}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newEmail" className="form-label">
            New Email:
          </label>
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            value={form.newEmail}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
        <center><small style={{color:"red"}}>The Password Use for the chake Authorization to right paerson.
          this is not change your password</small></center>
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
