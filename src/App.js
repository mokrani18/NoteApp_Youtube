import "./styles.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import { nanoid } from "nanoid";

export default function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNote, setCurrentNote] = useState(
    "notes[0] && notes[0].id" || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const onAddNote = () => {
    const newNote = {
      id: nanoid(),
      title: "untitled Note",
      body: "",
      lastModified: Date.now()
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    // setCurrentNote(newNote);
  };
  function onUpdateNote(updatedNote) {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === currentNote) {
        return updatedNote;
      } else {
        return note;
      }
    });
    return setNotes(updatedNotesArr);
  }
  function onDelete(noteId) {
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function getActiveNote() {
    return notes.find((note) => note.id === currentNote);
  }
  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDelete={onDelete}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
      />
      <Main
        notes={notes}
        currentNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
      />
    </div>
  );
}
