import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import ThemeToggle from "../components/ThemeToggle";
import CreateFolder from "../components/CreateFolder";
import DeleteFolder from "../components/DeleteFolder";
import ShareForm from "../components/ShareForm";
import { deleteFolder, getAllFolder } from "../services";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [isFolderPopupOpen, setIsFolderPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [folders, setFolders] = useState([]); // to manage folders
  const [isDarkMode, setIsDarkMode] = useState(false); // for theme
  const [folderToDelete, setFolderToDelete] = useState(null); // for the folder index to delete
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  const fetchFolder = async () =>{
    try{  
      const res = await getAllFolder();
      if(res.status === 200){
        const data = await res.json();
        setFolders(data.folders);
        console.log("fodler state:",folders);
        console.log("fetchfolder called:",folders);
      }
    }
    catch(error){
      console.error(`unable to fetch : ${error}`);
    }
}

  useEffect(()=>{
    const storedUsername = localStorage.getItem("username");
    if(storedUsername){
      setUsername(storedUsername);
    } 
    fetchFolder();
  },[])

  const addFolder = (folderName) => {
    // Check if folderName already exists (case-insensitive)
    // console.log("check sensitive", folderName);
    // const isDuplicate = folders.some(
    //   (folder) => folder.toLowerCase() === folderName.toLowerCase()
    // );

    // if (isDuplicate) {
    //   alert("folder with the same name already exist");
    //   return;
    // }
    setFolders((prevFolders) => [...prevFolders, folderName]);
    fetchFolder();
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const deleteFolderById = (indexToDelete) => {
    // Filter out the folder to delete
    setFolders((prevFolders) => prevFolders.filter((folder) => folder._id !== folderId));
    fetchFolder();
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.lightTheme : styles.darkTheme}`}>
      <div className={styles.container}>
        <nav className={styles.dashboardNav}>
          <div className={styles.navLeft}></div>
          <select className={isDarkMode ? styles.lightTheme : styles.darkTheme}>
            <option value="">{username}'s Workspace</option>
            <option value="">Settings</option>
            <option value="">Logout</option>
          </select>

          <div className={styles.navRight}>
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <button className={`${styles.btn} ${styles.btnShare}`} onClick={()=>setIsSharePopupOpen(true)}>Share</button>
          </div>
        </nav>
        <hr />

        <main className={styles.main}>
          {/* FOLDERS */}
          <div className={styles.folderContainer}>
            <div
              className={styles.folderItem}
              onClick={() => setIsFolderPopupOpen(true)}
            >
              <AiOutlineFolderAdd className={styles.folderIcon} />
              <span>Create a folder</span>
            </div>
            {/* Render folders dynamically */}
            {folders.map((folder, index) => (
              <div key={index} className={styles.folderItem}>
                <AiOutlineFolderAdd className={styles.folderIcon} />
                <span>{folder.foldername}</span>
                <RiDeleteBin6Line
                  className={styles.deleteIcon}
                  onClick={() => {
                    setFolderToDelete(folder._id); // Set the folder index to delete
                    setIsDeletePopupOpen(true); // Open the delete popup
                  }}
                />
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

          {/* FOLDER POPUP */}
          {isFolderPopupOpen && (
            <CreateFolder setIsFolderPopupOpen={setIsFolderPopupOpen} addFolder={addFolder} />
          )}

          {/* DELETE POPUP */}
          {isDeletePopupOpen && (
             <DeleteFolder
              setIsDeletePopupOpen={setIsDeletePopupOpen}
              deleteFolderById={deleteFolderById}
              folderId={folderToDelete} // Pass the folder index to delete
              />
          )}

          {/* SHARE POPUP */}
          {isSharePopupOpen && (
            <ShareForm setIsSharePopupOpen={setIsSharePopupOpen}/>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
