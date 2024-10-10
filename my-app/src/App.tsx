import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import './App.css';
import { ClickCounter } from "./hooksExercise";
import React, { useState, useEffect, useContext } from 'react';
import {ThemeContext, themes} from "./themeContext";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (title: string) => {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter(favorite => favorite !== title));
    } else {
      setFavorites([...favorites, title]);
    }
  };

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

 return (

   <div className={`app-container`}>
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
      <div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className="note-item">
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
       <div className="App">
          <ClickCounter/>
       </div>
     </div>
   </div>


 );
}
export default App;