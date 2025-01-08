import React, { useState } from "react";
import styles from "./DeleteFolder.module.css";
import { deleteFolder } from "../services";

const DeleteFolder = ({ setIsDeletePopupOpen, deleteFolderById, folderIndexToDelete }) => {
  const [error, setError] = useState();

  const handleDelete = async () => {
    console.log(folderIndexToDelete);
    try{
      const res = await deleteFolder(folderIndexToDelete);
      if(res.status === 200){
        const data = await res.json();
        deleteFolderById(folderIndexToDelete)
        handleClosePopup();
      }
      else if(res.status === 403){
        const errorData = await res.json();
        setError(errorData.message || "failed to delete folder")
      }
  }
    catch(error){
      console.error(`error while deleting ${error}`);
      setError("error occurred please try again");
    }
  };

  const handleClosePopup = () => {
    setIsDeletePopupOpen(false);
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleClosePopup}>
        <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
          <p className={styles.confirmDeleteText}>
            <span>Are you sure you want to </span>
            <span>delete this folder?</span>
            {error && <span className={styles.errorText}>{error}</span>}
          </p>
          <p className={styles.popupButton}>
            <button onClick={handleDelete} className={styles.confirm}>
              Confirm
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

export default DeleteFolder;
