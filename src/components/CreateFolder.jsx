import React, { useState } from "react";
import styles from "./CreateFolder.module.css";

const CreateFolder = ({ setIsPopupOpen, addFolder }) => {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    if (folderName.trim()) {
      addFolder(folderName); // Pass folder name to the parent
      setFolderName(""); // Clear input field
      handleClosePopup(); // Close the pop-up
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.popupContainer}>
          <div className={styles.popup}>
            <span>Create New Folder</span>
            <input
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <p className={styles.popupButton}>
              <button onClick={handleCreate}>Done</button>
              <span>|</span>
              <button onClick={handleClosePopup}>Cancel</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFolder;


// import React, { useState } from 'react'
// import styles from './CreateFolder.module.css'

// const CreateFolder = ({setIsPopupOpen}) => {
//     const [folderName, setFolderName] = useState("");

//     const handleCreate = () =>{
//          if (folderName.trim()) {
//     //   folderName; // Add note to the left side
//       setFolderName(""); // Clear input field
//       handleClosePopup(); // Close the pop-up
//     }
//     };

//     const handleClosePopup = () =>{
//         setIsPopupOpen(false);
//     }
//   return (
//     <>
//     <div className={styles.overlay}>
//         <div className={styles.popupContainer}>
//         <div className={styles.popup}>
//             <span>Create New Folder</span>
//             <input type="text" placeholder='Enter folder name' value={folderName} onChange={(e)=>setFolderName(e.target.value)}/>
//             {console.log(folderName)}
//             <p className={styles.popupButton}>
//             <button onClick={handleCreate}>Done</button>
//             <span>|</span>
//             <button onClick={handleClosePopup}>Cancel</button>
//             </p>
//         </div>
//         </div>
//     </div>
//     </>
//   )
// }

// export default CreateFolder
