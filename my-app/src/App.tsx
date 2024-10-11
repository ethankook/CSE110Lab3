// App.tsx
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import ToggleTheme from "./ToggleThemeExercise";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleFavorite = (title: string) => {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter(favorite => favorite !== title));
    } else {
      setFavorites([...favorites, title]);
    }
  };

  useEffect(() => {
    document.body.className = currentTheme === themes.light ? 'light-theme' : 'dark-theme';
    const notesHeaders = document.querySelectorAll('.notes-header');
    notesHeaders.forEach(header => {
      header.classList.remove('light-theme', 'dark-theme');
      header.classList.add(currentTheme === themes.light ? 'light-theme' : 'dark-theme');
    });
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };
  const updateNoteTitle = (id: number, newTitle: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, title: newTitle } : note));
    setFavorites(favorites.map(favorite => favorite === notes.find(note => note.id === id)?.title ? newTitle : favorite));
  };
  
  const deleteNote = (id: number) => {

    const noteToDelete = notes.find(note => note.id === id);
    
    if (noteToDelete) {
      setNotes(notes.filter(note => note.id !== id));
      setFavorites(favorites.filter(favorite => favorite !== noteToDelete.title));
    }
  };
  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <div className={`app-container ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}`}>
        {/* Highlighted changes start here */}
        <div className="form-container">
          <form className="note-form" onSubmit={createNoteHandler}>
            <div>
              <input
                placeholder="Note Title"
                onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Note Content"
                onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })}
                required
              />
            </div>
            <div className="labelForm" style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
              width: "220px",
            }}>
              <div>
                <select
                  onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label })}
                  required
                >
                  <option value={Label.personal}>Personal</option>
                  <option value={Label.study}>Study</option>
                  <option value={Label.work}>Work</option>
                  <option value={Label.other}>Other</option>
                </select>
              </div>
            </div>
            <div><button type="submit">Create Note</button></div>
          </form>
          <div className="ToggleThemeButtonContainer">
            <div className="ToggleThemeButton"><ToggleTheme /></div>
          </div>
        </div>

        <div className={`favorites-list ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}`}>
          <h2>Favorites</h2>
          {favorites.map((favorite, index) => (
            <p key={index}>{favorite}</p>
          ))}
        </div>
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className={`note-item ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}` } >
              <div className={`notes-header`} >
                <button className={`xbutton ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}`} onClick={()=>deleteNote(note.id)}>x</button>
                <button className={`favButton ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}`} onClick={() => toggleFavorite(note.title)}>
                  {favorites.includes(note.title) ? '❤️' : '♡'}
                </button>
              </div>
              <h2 contentEditable="true" onBlur={(event) => updateNoteTitle(note.id, event.currentTarget.textContent || '')}>{note.title} </h2>
              <p contentEditable="true" >{note.content}</p>
              <p contentEditable="true">{note.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;