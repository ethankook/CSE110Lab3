import {ThemeContext, themes} from './themeContext';
import React, { useState, useContext } from 'react';

function ToggleTheme(){
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
    
    return (
        <ThemeContext.Provider value={currentTheme}>
            <div className={`app-container ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}`}>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
        </ThemeContext.Provider>
    );
}
export default ToggleTheme;
