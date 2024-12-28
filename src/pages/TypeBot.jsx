import React, { useState } from "react";
import styles from "./TypeBot.module.css";
import ThemeToggle from "../components/ThemeToggle";
import { IoClose } from "react-icons/io5";
import { BsFillFlagFill } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import { TfiVideoClapper } from "react-icons/tfi";
import { CiText } from "react-icons/ci";
import { MdNumbers } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineGif } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const TypeBot = ({ setIsTypebotOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // For theme
  const [formFields, setFormFields] = useState([]); // For form fields

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleClosePopup = () => {
    setIsTypebotOpen(false); // Close the popup
  };

  // Handle adding a field
  const handleAddField = (fieldType) => {
    const newField = { id: Date.now(), type: fieldType, value: "" };
    setFormFields((prevFields) => [...prevFields, newField]);
  };

  // Handle deleting a field
  const handleDeleteField = (id) => {
    setFormFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const handleSave = () =>{

  }
  return (
    <>
      <div className={styles.overlay}>
        <div
          className={`${styles.container} ${
            isDarkMode ? styles.lightTheme : styles.darkTheme
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className={styles.navbar}>
            <input
              type="text"
              placeholder="Enter Form Name"
              className={styles.input}
            />
            <div className={styles.navMiddle}>
              <button className={`${styles.btn} ${styles.flow}`}>Flow</button>
              <button className={`${styles.btn} ${styles.response}`}>
                Response
              </button>
            </div>
            <div className={styles.navRight}>
              <ThemeToggle
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
              <button className={`${styles.btn} ${styles.share}`}>Share</button>
              <button className={`${styles.btn} ${styles.save}`} onClick={handleSave}>Save</button>
              <button className={styles.closebtn} onClick={handleClosePopup}>
                <IoClose className={styles.closeIcon} />
              </button>
            </div>
          </nav>
          <hr />
          {/* MAIN */}
          <main className={styles.main}>
            <div className={styles.mainleft}>
              <div className={styles.mainleftContainer}>
                <h4 className={styles.header}>Bubbles</h4>
                <div className={`${styles.bubbles} ${styles.Options}`}>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Text")}
                  >
                    <BsChatLeftText className={styles.bubbleIcon} />{" "}
                    <span>Text</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Images")}
                  >
                    <BsFillImageFill className={styles.bubbleIcon} />{" "}
                    <span>Images</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Video")}
                  >
                    <TfiVideoClapper
                      className={`${styles.bubbleIcon} ${styles.video}`}
                    />{" "}
                    <span>Video</span>
                  </button>
                  <button
                    className={`${styles.Option} ${styles.gifContainer}`}
                    onClick={() => handleAddField("GIF")}
                  >
                    <MdOutlineGif
                      className={`${styles.bubbleIcon} ${styles.gif}`}
                    />{" "}
                    <span>GIF</span>
                  </button>
                </div>

                <h4 className={styles.header}>Inputs</h4>
                <div className={`${styles.Inputs} ${styles.Options}`}>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Input Text")}
                  >
                    <CiText className={styles.inputIcon} /> <span>Text</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Number")}
                  >
                    <MdNumbers className={styles.inputIcon} />{" "}
                    <span>Number</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Email")}
                  >
                    <MdAlternateEmail className={styles.inputIcon} />{" "}
                    <span>Email</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Phone")}
                  >
                    <CiPhone className={styles.inputIcon} /> <span>Phone</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Date")}
                  >
                    <MdOutlineDateRange className={styles.inputIcon} />{" "}
                    <span>Date</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Rating")}
                  >
                    <CiStar className={styles.inputIcon} /> <span>Rating</span>
                  </button>
                  <button
                    className={styles.Option}
                    onClick={() => handleAddField("Buttons")}
                  >
                    <IoMdCheckboxOutline className={styles.inputIcon} />{" "}
                    <span>Buttons</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main right */}
            <div className={styles.mainright}>
              <div>
                <button className={styles.startbtn}>
                  <BsFillFlagFill /> <span> Start</span>
                </button>
              </div>

              {/* <div className={` ${styles.dynamicFields}`}> */}
                {formFields.map((field) => (
                  <div key={field.id} className={styles.textboxContainer}>
                    <span className={styles.textboxLabel}>{field.type}</span>
                    <input
                      type="text"
                      placeholder={`Enter ${field.type}`}
                      className={styles.textboxInput}
                      value={field.value}
                      onChange={(e) =>
                        setFormFields((prevFields) =>
                          prevFields.map((f) =>
                            f.id === field.id
                              ? { ...f, value: e.target.value }
                              : f
                          )
                        )
                      }
                    />
                    <button className={`${styles.textboxBtn}`} Click={() => handleDeleteField(field.id)}
                    >
                      <RiDeleteBin6Line className={styles.deleteIcon}/>
                    </button>
                  </div>
                ))}
              {/* </div> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TypeBot;




// import React, { useState } from 'react'
// import styles from './TypeBot.module.css'
// import ThemeToggle from "../components/ThemeToggle";
// import { IoClose } from "react-icons/io5";
// import { BsFillFlagFill } from "react-icons/bs";
// import { BsChatLeftText } from "react-icons/bs";
// import { BsFillImageFill } from "react-icons/bs";
// import { TfiVideoClapper } from "react-icons/tfi";
// import { CiText } from "react-icons/ci";
// import { MdNumbers } from "react-icons/md";
// import { MdAlternateEmail } from "react-icons/md";
// import { CiPhone } from "react-icons/ci";
// import { MdOutlineDateRange } from "react-icons/md";
// import { CiStar } from "react-icons/ci";
// import { IoMdCheckboxOutline } from "react-icons/io";
// import { MdOutlineGif } from "react-icons/md";
// import TextBox from '../components/TextBox';

// const TypeBot = ({setIsTypebotOpen}) => {
//     const [isDarkMode, setIsDarkMode] = useState(false); // for theme
//     const [formFields, setFormFields] = useState([]); // for form fields;

//     const toggleTheme = () => {
//         setIsDarkMode((prevMode) => !prevMode);
//       };

//       const handleClosePopup = () =>{
//         setIsTypebotOpen(false); // Close the popup
//       }
//       const handleSave = () =>{
//         setFormFields((prevFields) => [...prevFields, formFields]);
//       }

//     return (
//     <>
//     <div className={styles.overlay}>
//     <div className={`${styles.container} ${isDarkMode ? styles.lightTheme : styles.darkTheme}`} onClick={(e) => e.stopPropagation()}>
//         <nav className={styles.navbar}>
//             <input type="text" placeholder='Enter Form Name' className={styles.input}/>
//             <div className={styles.navMiddle}>
//                 <button className={`${styles.btn} ${styles.flow}`}>Flow</button>
//                 <button className={`${styles.btn} ${styles.response}`}>Response</button>
//             </div>
//             <div className={styles.navRight}>   
//                 <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
//                 {/* <ThemeToggle/> */}
//                 <button className={`${styles.btn} ${styles.share}`}>Share</button>
//                 <button className={`${styles.btn} ${styles.save}`} onClick={handleSave}>Save</button>
//                 <button className={styles.closebtn} onClick={handleClosePopup}><IoClose className={styles.closeIcon} /></button>
//             </div>
//         </nav>
//         <hr />
//         {/* MAIN */}
//         <main className={styles.main}>
//             <div className={styles.mainleft}>
//                 <div className={styles.mainleftContainer}>
//                     <h4 className={styles.header}>Bubbles</h4>
//                     <div className={`${styles.bubbles} ${styles.Options}`}>
//                         <button className={`${styles.Option}`}><BsChatLeftText className={styles.bubbleIcon}/> <span>Text</span></button>
//                         <button className={`${styles.Option}`}><BsFillImageFill className={styles.bubbleIcon}/>  <span>Images</span></button>
//                         <button className={`${styles.Option}`}><TfiVideoClapper className={`${styles.bubbleIcon} ${styles.video}`}/> <span>Video</span></button>
//                         <button className={`${styles.Option} ${styles.gifContainer}`}><MdOutlineGif className={`${styles.bubbleIcon} ${styles.gif}`}/> <span>GIF</span></button>
//                     </div>

//                     <h4 className={styles.header}>Inputs</h4>
//                     <div className={`${styles.Inputs} ${styles.Options}`}>
//                         <button className={`${styles.Option}`}><CiText className={styles.inputIcon}/> <span>Text</span></button>
//                         <button className={`${styles.Option} `}><MdNumbers className={styles.inputIcon}/>  <span>Number</span></button>
//                         <button className={`${styles.Option} `}><MdAlternateEmail className={styles.inputIcon}/> <span>Email</span></button>
//                         <button className={`${styles.Option}`}><CiPhone className={styles.inputIcon}/>  <span>Phone</span></button>
//                         <button className={`${styles.Option} `}><MdOutlineDateRange className={styles.inputIcon}/>  <span>Date</span></button>
//                         <button className={`${styles.Option}`}><CiStar className={styles.inputIcon}/> <span>Rating</span></button>
//                         <button className={`${styles.Option}`}><IoMdCheckboxOutline className={styles.inputIcon}/>  <span>Buttons</span></button>
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.mainright}>
//                 <div>
//                 <button className={styles.startbtn}><BsFillFlagFill /> <span> Start</span></button>
//                 </div>

//                 <div>
//                     <TextBox/>
//                 </div>
//             </div>
//         </main>
//     </div>
//     </div>
//     </>
//   )
// }

// export default TypeBot;