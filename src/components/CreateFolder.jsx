import React, { useState } from "react";
import styles from "./CreateFolder.module.css";
import { createFolder } from "../services"; // This makes an API call

const CreateFolder = ({ setIsFolderPopupOpen, addFolder }) => {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState(null); // Track error state

  const handleCreate = async () => {
    // Validate input
    if (!folderName.trim()) {
      setError("Folder name cannot be empty.");
      return;
    }
 
    try {
      const res = await createFolder(folderName); // API call
      if (res.status === 200) {
        const data = await res.json(); // Parse JSON
        console.log("foldername response : ",data.folder.foldername);
        addFolder(data.folder.foldername); // Pass to parent
        setFolderName(""); // Clear input
        handleClosePopup(); // Close popup
    
      } 
      else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to create folder!");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleClosePopup = () => {
    setIsFolderPopupOpen(false);
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleClosePopup}>
        <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
          <span>Create New Folder</span>
          <input
            type="text"
            placeholder="Enter folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          {error && <p className={styles.errorText}>{error}</p>} {/* Show error message */}
          <p className={styles.popupButton}>
            <button onClick={handleCreate} className={styles.done}>
              Done
            </button>
            <span>|</span>
            <button onClick={handleClosePopup} className={styles.cancel}>
              Cancel
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateFolder;
