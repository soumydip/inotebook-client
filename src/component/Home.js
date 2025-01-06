import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/All.css";
import LoadingSkeleton from "../othersRoutes/LoadingSkeleton";
export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // To display success messages
  const [editNote, setEditNote] = useState(null); // State for the note being edited

  // Clear success/error messages after a delay
  const clearMessages = () => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };
  // Fetch all notes
  const fetchAllNotes = async () => {
    try {
      const token =localStorage.getItem("authToken");
      const response = await axios.get(
        "http://localhost:4000/api/notes/fetchAllNotes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setNotes(response.data.notes);

      } else {
        setError(response.data.message || "Failed to fetch notes.");
      }
    } catch (error) {
      setError("Error fetching notes: " + error.message);
    } finally {
      setLoading(false);
      clearMessages();
    }
  };

  // Handle Edit button click
  const handleEdit = (note) => {
    setEditNote({ ...note });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditNote((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated note
  const saveNote = async () => {
    try {
      const token =localStorage.getItem("authToken")
      const response = await axios.put(
        `http://localhost:4000/api/notes/editNote/${editNote.noteId}`,
        {
          title: editNote.title,
          description: editNote.description,
          tag: editNote.tag,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setNotes(
          notes.map((note) =>
            note.noteId === editNote.noteId ? { ...editNote } : note
          )
        );
        setSuccess(response.data.message || "Note updated successfully!");
        setEditNote(null); // Close the modal
      } else {
        setError(response.data.message || "Failed to update note.");
      }
    } catch (error) {
      setError("Error updating note: " + error.message);
    } finally {
      clearMessages();
    }
  };

  // Delete note
  const deleteNote = async (noteId) => {
    try {
      const token =localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:4000/api/notes/deleteNote/${noteId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setNotes(notes.filter((note) => note.noteId !== noteId));
        setSuccess(response.data.message || "Note deleted successfully!");
      } else {
        setError(response.data.message || "Failed to delete note.");
      }
    } catch (error) {
      setError("Error deleting note: " + error.message);
    } finally {
      clearMessages();
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className="mainContent container" style={{ marginTop: "100px" }}>
      {/* Success and Error Messages */}
      <div className="massageContener">
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      {loading ? (
        <LoadingSkeleton/>
      ) : notes.length > 0 ? (
        <div className="row mainPage">
          {notes.map((note) => (
            <div key={note.noteId} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Author: <strong>{note.auther}</strong>
                  </h6>
                  <p className="card-text">{note.description}</p>
                  <p className="card-text">
                    <strong>Tag:</strong> {note.tag}
                  </p>
                  <p className="card-text">
                    <strong>Created At:</strong>{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(note)}
                    >
                      <i className="fa-solid fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteNote(note.noteId)}
                    >
                      <i className="fa-solid fa-trash-can"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No notes available.</p>
      )}

      {/* Bootstrap Modal */}
      {editNote && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditNote(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={editNote.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={editNote.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      value={editNote.tag}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditNote(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveNote}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
