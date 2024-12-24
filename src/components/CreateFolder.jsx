import React, { useState } from "react";
import styles from "./CreateFolder.module.css";

const CreateFolder = ({ setIsPopupOpen, addFolder }) => {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    if (folderName.trim()) {
      addFolder(folderName); // Pass folder name to the parent
      setFolderName(""); 
      handleClosePopup(); 
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleClosePopup}>
        <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
          <div className={styles.popup}>
            <span>Create New Folder</span>
            <input
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <p className={styles.popupButton}>
              <button onClick={handleCreate} className={styles.done}>Done</button>
              <span>|</span>
              <button onClick={handleClosePopup} className={styles.cancel}>Cancel</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFolder;
