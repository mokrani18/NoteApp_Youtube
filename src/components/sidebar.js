import React from "react";

export default function Sidebard({
  notes,
  onAddNote,
  onDelete,
  currentNote,
  setCurrentNote
}) {
  const sorted = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {sorted.map((note) => (
          <div
            className={`app-sidebar-note ${
              currentNote === note.id && "active"
            }`}
            key={note.id}
            onClick={() => setCurrentNote(note.id)}
          >
            {() => setCurrentNote(note.id)}
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
            <p>{note.body && note.body.substr(0, 30) + "..."}</p>
            <small className="notes-meta">
              {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
