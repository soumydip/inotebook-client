import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const intitialTheme =localStorage.getItem("theme");
  const [theme, setTheme] = useState(intitialTheme);

  // save the theme in local storage 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // update the theme with the current theme
  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme); // Save theme to localStorage
    }
  }, [theme]); // When theme changes, save it

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
