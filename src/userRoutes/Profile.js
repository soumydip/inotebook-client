import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/profile.css";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const token = localStorage.getItem("authToken");

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const ALLOWED_FORMATS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      showMessage("Error fetching user profile.", "danger");
    }
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/images/fetchImage",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setImageUrl(response.data.imageUrl);
        setImageId(response.data.ImageId);
      }
    } catch (error) {
      showMessage("Failed to fetch profile image.", "danger");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        showMessage("File size exceeds 10 MB.", "danger");
        setFile(null);
        return;
      }
      // Validate file format
      if (!ALLOWED_FORMATS.includes(selectedFile.type)) {
        showMessage(
          "Only JPG, JPEG, and PNG formats are allowed.",
          "danger"
        );
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showMessage("Please select a valid file to upload.", "danger");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImageUrl(response.data.data.imageUrl);
      setImageId(response.data.data._id);
      setFile(null);
      showMessage("Image uploaded successfully.", "success");
    } catch (error) {
      showMessage("Failed to upload image.", "danger");
    }
  };

  const handleDelete = async () => {
    if (!imageId) {
      showMessage("No image to delete.", "danger");
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/images/delete/${imageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setImageUrl(null);
      setImageId(null);
      showMessage("Image deleted successfully.", "success");
    } catch (error) {
      showMessage("Failed to delete image.", "danger");
    }
  };
  const handleEdit=()=>{
    if (!file) {
      showMessage("Please select a valid file to upload.", "danger");
      return;
    }
    //delete image
    handleDelete();
    //add new image
    handleUpload();
  }
  const showImage=()=>{
   if(imageUrl){
    window.open(imageUrl,"_blank");
   }
  }
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 3000); // Message will disappear after 3 seconds
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchImage();
    }
  }, [userData]);

  return (
    <div className="profile-container container py-4">
      {/* Alert Box */}
      {message && (
        <div
          className={`alert alert-${messageType} position-fixed top-0 start-50 translate-middle-x w-50 text-center`}
          style={{ zIndex: 1050 }}
          role="alert"
        >
          {message}
        </div>
      )}

      {/* Profile Section */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">User Profile</h2>
            {userData ? (
              <div className="text-center">
                <p>
                  <strong>Name:</strong> {userData.userName}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.phone}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}

            <div className="text-center mt-4">
              <h3>Profile Image</h3>
              {imageUrl ? (
                <>
                  <div className="imageContener" onClick={showImage}>
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="rounded-circle mb-3"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-danger me-2"
                      onClick={handleDelete}
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="d-inline-block"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="form-control mb-2"
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleEdit}
                      >
                        <i className="fa fa-edit"></i> Edit Image
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="no-image-container mb-3">
                    <i
                      className="fa fa-user-circle text-secondary"
                      style={{ fontSize: "100px" }}
                    ></i>
                  </div>
                  <p className="text-muted">No Profile Photo</p>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="form-control mb-2"
                    />
                    <button className="btn btn-success" onClick={handleUpload}>
                      <i className="fa fa-upload"></i> Upload Image
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
