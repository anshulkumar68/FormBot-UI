import React, { useState } from "react";
import styles from "./DropdownMenu.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"; 
import { handleLogout } from "../utils/authLogout";

const DropdownMenu = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // React Router's hook for navigation

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.addEventListener("mousedown", closeDropdown);
    } else {
      document.removeEventListener("mousedown", closeDropdown);
    }
  };

  const closeDropdown = (event) => {
    const isClickInside = event.target.closest(`.${styles.dropdownContainer}`);
    if (!isClickInside) {
      setIsOpen(false);
      document.removeEventListener("mousedown", closeDropdown);
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
    document.activeElement.blur();
  };

  return (
    <div className={styles.dropdownContainer}>
      {/* Dropdown Header */}
      <div
        className={`${styles.dropdownHeader} ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        <span>{username}'s workspace</span>
        <IoMdArrowDropdown
          className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`}
        />
      </div>

      {/* Dropdown Items */}
      {isOpen && (
        <div className={styles.dropdownList}>
          <Link to="/settings"><div className={styles.dropdownItem} onClick={handleItemClick}>
            Settings
          </div></Link>
          <div
            className={`${styles.dropdownItem} ${styles.logout}`}
            onClick={()=>handleLogout(navigate)}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;




// import React, { useState } from "react";
// import styles from "./DropdownMenu.module.css";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { Link } from "react-router-dom";

// const DropdownMenu = ({ username }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     if (!isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     setIsOpen(!isOpen);
//   };

//   const handleClickOutside = (event) => {
//     const dropdownElement = document.querySelector(`.${styles.dropdownContainer}`);
//     if (dropdownElement && !dropdownElement.contains(event.target)) {
//       setIsOpen(false);
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//   };

//   return (
//     <div className={styles.dropdownContainer}>
//       {/* Dropdown Header */}
//       <div
//         className={`${styles.dropdownHeader} ${isOpen ? styles.open : ""}`}
//         onClick={toggleDropdown}
//       >
//         <span>{username}'s workspace</span>
//         <IoMdArrowDropdown
//           className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`}
//         />
//       </div>

//       {/* Dropdown Items */}
//       {isOpen && (
//         <div className={styles.dropdownList}>
//           <Link to="/settings"><div className={styles.dropdownItem}>Settings</div></Link>
//           {/* <div className={styles.dropdownItem}>Settings</div> */}
//           <div className={`${styles.dropdownItem} ${styles.logout}`}>
//             Log Out
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownMenu;
