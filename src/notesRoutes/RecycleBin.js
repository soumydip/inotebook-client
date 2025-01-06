import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RecycleBin() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message

  useEffect(() => {
    const fetchRecycleBinNotes = async () => {
      try {
        const token =localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:4000/api/notes/fetchRecycleBin",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setNotes(response.data.notes || []);
        } else {
          setError("Failed to fetch notes from recycle bin.");
        }
      } catch (error) {
        setError("Error fetching notes: " + error.message);
      }
    };

    fetchRecycleBinNotes();
  }, []);

  // Handle permanent delete with confirmation
  const handleDeletePermanent = async (noteId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to permanently delete this note?"
    );
    if (!isConfirmed) return;

    try {
      const token =localStorage.getItem();
      const response = await axios.delete(
        `http://localhost:4000/api/notes/deletePermanent/${noteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setNotes(notes.filter((note) => note.noteId !== noteId));
        setMessage("Note permanently deleted!");
      } else {
        setError("Failed to permanently delete the note.");
      }
    } catch (error) {
      setError("Error deleting note permanently: " + error.message);
    }
  };

  // Handle restore note
  const handleRestoreNote = async (noteId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:4000/api/notes/restoreNote/${noteId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setNotes(notes.filter((note) => note.noteId !== noteId));
        setMessage("Note restored successfully!");
      } else {
        setError("Failed to restore the note.");
      }
    } catch (error) {
      setError("Error restoring note: " + error.message);
    }
  };

  // Clear messages after a certain time
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000); // Clear messages after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <div className="container mt-5">
      <h2>Recycle Bin</h2>

      {/* Display messages */}
      <div className="messageContener">
        {message && <p className="alert alert-success">{message}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>

      <div className="list-group  col-md-4 col-sm-12">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <div className="list-group-item" key={note.noteId}>
              <h5>{note.title}</h5>
              <h6>{note.tag}</h6>
              <p>{note.description}</p>
              <small>
                Deleted on:{" "}
                {note.createdAt
                  ? new Date(note.createdAt).toLocaleString()
                  : "N/A"}
              </small>
              <div className="mt-3">
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleRestoreNote(note.noteId)}
                >
                  Restore
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePermanent(note.noteId)}
                >
                  Delete Permanent
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No notes in the recycle bin.</p>
        )}
      </div>
      <div
        className="heroActionShortcut"
        style={{
          position: "absolute",
          top: "100px",
          right: "20px",
        }}
      >
        <Link to="/">
          <button className="btn btn-primary fs-6">Back to My Notes</button>
        </Link>
      </div>
    </div>
  );
}
