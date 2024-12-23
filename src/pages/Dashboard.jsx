import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import ThemeToggle from "../components/ThemeToggle";
import CreateFolder from "../components/CreateFolder";

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [folders, setFolders] = useState([]); // State to manage folders
  const [isDarkMode, setIsDarkMode] = useState(true); // State for theme

  const addFolder = (folderName) => {
    // Check if folderName already exists (case-insensitive)
    const isDuplicate = folders.some(
      (folder) => folder.toLowerCase() === folderName.toLowerCase()
    );

    if (isDuplicate) {
      alert("Folder with the same name already exists!");
      return;
    }
    setFolders((prevFolders) => [...prevFolders, folderName]);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.lightTheme : styles.darkTheme}`}>
      <div className={styles.container}>
        <nav className={styles.dashboardNav}>
          <div className={styles.navLeft}></div>
          <select className={isDarkMode ? styles.lightTheme : styles.darkTheme}>
            <option value="">Workspace</option>
            <option value="">Settings</option>
            <option value="">Logout</option>
          </select>

          <div className={styles.navRight}>
            {/* Integrate ThemeToggle with props */}
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <button className={`${styles.btn} ${styles.btnShare}`}>Share</button>
          </div>
        </nav>
        <hr />

        <main className={styles.main}>
          {/* FOLDERS */}
          <div className={styles.folderContainer}>
            <div
              className={styles.folderItem}
              onClick={() => setIsPopupOpen(true)}
            >
              <AiOutlineFolderAdd className={styles.folderIcon} />
              <span>Create a folder</span>
            </div>
            {/* Render folders dynamically */}
            {folders.map((folder, index) => (
              <div key={index} className={styles.folderItem}>
                <AiOutlineFolderAdd className={styles.folderIcon} />
                <span>{folder}</span>
              </div>
            ))}
          </div>

          {/* TYPEBOTS */}
          <div className={styles.typeBotContainer}>
            <div className={styles.typeBotS}>
              <IoAdd className={styles.addIcon} />
              <span>Create a typebot</span>
            </div>
          </div>

          {/* POPUP */}
          {isPopupOpen && (
            <CreateFolder setIsPopupOpen={setIsPopupOpen} addFolder={addFolder} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;












// import React, { useState } from "react";
// import styles from "./Dashboard.module.css";
// import { AiOutlineFolderAdd } from "react-icons/ai";
// import { IoAdd } from "react-icons/io5";
// import ThemeToggle from "../components/ThemeToggle";
// import CreateFolder from "../components/CreateFolder";

// const Dashboard = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [folders, setFolders] = useState([]); // State to manage folders

//   const addFolder = (folderName) => {
//         // Check if folderName already exists (case-insensitive)
//     const isDuplicate = folders.some(
//       (folder) => folder.toLowerCase() === folderName.toLowerCase()
//     );

//     if (isDuplicate) {
//       alert("Folder with the same name already exists!");
//       return;
//     }
//     setFolders((prevFolders) => [...prevFolders, folderName]);
//   };


//   return (
//     <>
//       <div className={styles.container}>
//         <nav className={styles.dashboardNav}>
//           <div className={styles.navLeft}></div>
//           <select>
//             <option value="">Workspace</option>
//             <option value="">Settings</option>
//           </select>

//           <div className={styles.navRight}>
//             <ThemeToggle/>
//             <button className={`${styles.btn} ${styles.btnShare}`}>Share</button>
//           </div>
//         </nav>
//         <hr />

//         <main className={styles.main}>
//           {/* FOLDERS */}
//           <div className={styles.folderContainer}>
//             <div
//               className={styles.folderItem}
//               onClick={() => setIsPopupOpen(true)}
//             >
//               <AiOutlineFolderAdd className={styles.folderIcon} />
//               <span>Create a folder</span>
//             </div>
//             {/* Render folders dynamically */}
//             {folders.map((folder, index) => (
//               <div key={index} className={styles.folderItem}>
//                 <AiOutlineFolderAdd className={styles.folderIcon} />
//               <span>{folder}</span>
//               </div>
//             ))}
//           </div>

//           {/* TYPEBOTS */}
//           <div className={styles.typeBotContainer}>
//             <div className={styles.typeBotS}>
//               <IoAdd className={styles.addIcon} />
//               <span>Create a typebot</span>
//             </div>
//           </div>

//           {/* POPUP */}
//           {isPopupOpen && (
//             <CreateFolder setIsPopupOpen={setIsPopupOpen} addFolder={addFolder} />
//           )}
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

