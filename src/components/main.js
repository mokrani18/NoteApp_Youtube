import React from "react";
import ReactMarkdown from "react-markdown";

export default function Main({ currentNote, onUpdateNote }) {
  function onEditField(key, value) {
    onUpdateNote({
      ...currentNote,
      [key]: value,
      lastModified: Date.now()
    });
  }
  if (!currentNote)
    return <div className="no-active-note">No active notes</div>;
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={currentNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          value={currentNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
          placeholder="write you note here ..."
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{currentNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {currentNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}
