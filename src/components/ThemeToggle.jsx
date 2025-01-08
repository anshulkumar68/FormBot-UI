import React from "react";
import PropTypes from "prop-types";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className={styles.themeToggle}>
      <label className={`${styles.toggletext} ${isDarkMode ? styles.lightTheme : styles.darkTheme}`}>
        Light
      </label>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={!isDarkMode}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>
      <label className={`${styles.toggletext} ${isDarkMode ? styles.lightTheme : styles.darkTheme}`}>
        Dark
      </label>
    </div>
  );
};

ThemeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ThemeToggle;

