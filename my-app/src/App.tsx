//App.tsx
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import {ThemeContext, themes} from "./themeContext";
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
  
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
};

 return (
  <ThemeContext.Provider value={{currentTheme, toggleTheme}}>
   <div className={`app-container ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}`}>
         <form className="note-form">
       <div><input placeholder="Note Title"></input></div>
       <div><textarea placeholder="Note Content"></textarea></div>
       <div id = "labelForm">      
         <select name="label" id="label">
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Other">Other</option>
      </select>
      </div>
       <div><button type="submit">Create Note</button></div>
      </form>
      <div className="favorites-list">
        
        <h2>Favorites</h2>
        {favorites.map((favorite, index) => (
          <p key={index}>{favorite}</p>
        ))}
      </div>
      <div className="notes-grid" >
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className={`note-item`} >
           <div className="notes-header">
             <button>x</button>
             <button onClick={() => toggleFavorite(note.title)}>
                {favorites.includes(note.title) ? '❤️' : '♡'}
              </button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
         </div>
         
       ))}
         <div className="ToggleThemeButton"><ToggleTheme/></div>
     </div>
   </div>
  </ThemeContext.Provider>



 );
}
export default App;