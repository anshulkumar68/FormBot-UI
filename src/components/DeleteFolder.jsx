import React, { useState } from "react";
import styles from "./DeleteFolder.module.css";
import { deleteFolder } from "../services";

const DeleteFolder = ({ setIsDeletePopupOpen, deleteFolderById, folderId }) => {
  const handleDelete = async () => {
    // deleteFolderById(folderId); // Use the provided index to delete the folder
    // setIsDeletePopupOpen(false); // Close the delete popup after deletion

    try{
      const res = await deleteFolder(folderId);
      if(res.status === 200){
        const data = await res.json();
        deleteFolderById(folderId)
        handleClosePopup();
      }
  }
    catch(error){
      console.error(`error while deleting ${error}`);
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

