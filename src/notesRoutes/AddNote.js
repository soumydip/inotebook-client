import React, { useState } from 'react';
import axios from 'axios';

export default function AddNote() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');  // Corrected variable name
  const [tag, setTag] = useState('General');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {  // Use 'description' here as well
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const token =localStorage.getItem("authToken");
      const newNote = { title, description, tag }; 

      // Make a POST request to the backend to add the note
      const response = await axios.post(
        'http://localhost:4000/api/notes/addNote',  // Ensure this URL is correct
        newNote,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccessMessage("Note added successfully!");
        setTitle('');
        setDescription('');  // Corrected variable name
        setTag('General');
        setError('');
      } else {
        setError("Failed to add the note.");
      }
    } catch (error) {
      setError("Error adding note: " + error.message);
    }
  };

  return (
    <div className="container mt-5  mb-5">
      <h2>Add Note</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {successMessage && <p className="alert alert-success">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description" 
            className="form-control"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            id="tag"
            className="form-control"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
    </div>
  );
}
