import React, { useState } from "react";
import styles from "./DropdownMenu.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

const DropdownMenu = ({username}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
          <div className={styles.dropdownItem}>Settings</div>
          <div className={`${styles.dropdownItem} ${styles.logout}`}>
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

// const DropdownMenu = ({username}) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={styles.dropdownContainer}>
//       {/* Dropdown Header */}
//       <div className={`${styles.dropdownHeader} ${isOpen ? styles.open : styles.dropdownHeader}`} onClick={toggleDropdown}>
//         <span>{username}'s workspace</span>
//         <IoMdArrowDropdown className={styles.arrowIcon} />
//       </div>

//       {/* Dropdown Items */}
//       {isOpen && (
//         <div className={styles.dropdownList}>
//           <div className={styles.dropdownItem}>Settings</div>
//           <div className={`${styles.dropdownItem} ${styles.logout}`}>
//             Log Out
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownMenu;
