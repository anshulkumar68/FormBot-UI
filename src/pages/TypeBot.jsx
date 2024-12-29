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
import { createForm } from "../services";

const TypeBot = ({ setIsTypebotOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // For theme
  const [formFields, setFormFields] = useState([]); // For form fields
  const [formInfo, setFormInfo] = useState({
    formname: "",
    bubbleText: "",
    inputText: "",
    images: "",
    number: "",
    email: "",
    phone: "",
    rating: "",
    date: "",
    buttons: "",
    fieldId:""
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleClosePopup = () => {
    setIsTypebotOpen(false); // Close the popup
  };

  const handleAddField = (fieldType) => {
    const lowerCaseKey = fieldType.toLowerCase(); // Convert fieldKey to lowercase
    const newField = { id: Date.now(), type: lowerCaseKey, value: "" };
    setFormFields((prevFields) => [...prevFields, newField]);
  
    // Update formInfo to track the new field
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      [lowerCaseKey]: "", // Initialize the field with an empty value
    }));
  };

  // Handle deleting a field
  const handleDeleteField = (id) => {
    setFormFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const handleSave =  async () =>{
    try{
      const res = await createForm(formInfo);
      if(res.status === 200){
        alert('form created successfully');
      }else{
        alert('error saving form')
      }
    }catch(error){
      console.error('error saving form');
      alert('unexpected error occured');
    }


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
              name="formname"
              value={formInfo.formname}
              onChange={(e)=>setFormInfo({...formInfo, [e.target.name]:e.target.value})}
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
                    onClick={() => handleAddField("Input_Text")}
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

              {/* INPUT FIELDS */}
              {formFields.map((field) => (
                <div key={field.id} className={styles.textboxContainer}>
                  <span className={styles.textboxLabel}>{field.type}</span>
                  <input
                    type="text"
                    placeholder={`Enter ${field.type}`}
                    className={styles.textboxInput}
                    value={formInfo[field.type]} // Bind value from formInfo
                    onChange={(e) =>
                      setFormInfo((prevInfo) => ({
                        ...prevInfo,
                        [field.type]: e.target.value, // Update the corresponding field in formInfo
                      }))
                    }
                  />
                  <button
                    className={styles.textboxBtn}
                    onClick={() => handleDeleteField(field.id)}
                  >
                    <RiDeleteBin6Line className={styles.deleteIcon} />
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TypeBot;

