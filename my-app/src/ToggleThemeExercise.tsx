//ToggleThemeExercise.tsx
import {ThemeContext, themes} from './themeContext';
import React, { useContext } from 'react';

function ToggleTheme(){
    const { currentTheme, toggleTheme } = useContext(ThemeContext);

    
    return (
            <div className={`app-container ${currentTheme === themes.light ? 'light-theme' : 'dark-theme'}`}>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
    );
}
export default ToggleTheme;
