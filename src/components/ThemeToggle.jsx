import React, { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; // Default to dark mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>Light</span>
      <div
        className={`${styles.toggle} ${isDarkMode ? styles.dark : ""}`}
        onClick={toggleTheme}
      ></div>
      <span className={styles.label}>Dark</span>
    </div>
  );
};

export default ThemeToggle;
