import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { AiOutlineFolderAdd } from "react-icons/ai";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.dashboardNav}>
          <div className={styles.navLeft}></div>
          <select>
            <option value="">Workspace</option>
            <option value="">Settings</option>
            <option value="">Log out</option>
          </select>

          <div className={styles.navRight}>
            <ThemeToggle />
            <button className={`${styles.btn} ${styles.btnShare}`}>
              Share
            </button>
          </div>
        </nav>
        <hr />

        <main className={styles.main}>
          <div className={styles.folderContainer}>
            <div className={styles.folderCreate}>
              <AiOutlineFolderAdd className={styles.folderIcon}/>
              <span>Create a folder</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
