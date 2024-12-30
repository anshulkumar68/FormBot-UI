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
import { createForm, deleteField } from "../services";

const TypeBot = ({ setIsTypebotOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // For theme
  const [formFields, setFormFields] = useState([]); // For form fields
  const [formInfo, setFormInfo] = useState({
    formname: "",
    fields: [],
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleClosePopup = () => {
    setIsTypebotOpen(false); // Close the popup
  };

  const handleAddField = (fieldType) => {
    const fieldId = Date.now().toString(); // Generate a unique ID
    // Create a new field object
    const newField = { fieldId, type: fieldType, value: "" };

    // Add the new field to the form's fields array
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      fields: [...prevInfo.fields, newField],
    }));

    // Add to formFields for rendering purposes
    setFormFields((prevFields) => [
      ...prevFields,
      { id: fieldId, type: fieldType },
    ]);

    console.log("Form Info After Add:", formInfo);
  };

  const handleFieldChange = (id, newValue) => {
    // Update the specific field's value in formInfo
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      fields: prevInfo.fields.map((field) =>
        field.fieldId === id ? { ...field, value: newValue } : field
      ),
    }));
  };

  // Handle deleting a field
  const handleDeleteField = async (id) => {
    try {
      const response = await deleteField(id); // Assuming id is the field ID
      if (response.status === 200) {
        setFormFields((prevFields) => prevFields.filter((field) => field.id !== id));
        setFormInfo((prevInfo) => ({
          ...prevInfo,
          fields: prevInfo.fields.filter((field) => field.fieldId !== id),
        }));
      } else {
        alert("Error deleting field.");
      }
    } catch (error) {
      console.error("Error deleting field:", error);
      alert("Unexpected error occurred.");
    }
  };

  const handleSave = async () => {
    if (!formInfo.formname) {
      alert("Please enter a form name.");
      return;
    }
    if (formInfo.fields.length === 0) {
      alert("Please add at least one field.");
      return;
    }

    try {
      const res = await createForm(formInfo);
      if (res.status === 200) {
        const data = await res.json();
        alert("Form created successfully!");
        setFormInfo((prev) => ({ ...prev, formId: data.form_id }));
      } else if (res.status === 400) {
        const errorData = await res.json();
        alert(errorData.message || "Failed to create form");
      }
    } catch (error) {
      console.error("Error creating form:", error);
      alert("Unexpected error occurred.");
    }
  };

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
              onChange={(e) =>
                setFormInfo({ ...formInfo, formname: e.target.value })
              }
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
                    value={formInfo.fields.find((f) => f.fieldId === field.id)?.value || ""} // Bind value from formInfo
                    onChange={(e) => handleFieldChange(field.id, e.target.value)} // Update the specific field
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





// import React, { useState } from "react";
// import styles from "./TypeBot.module.css";
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
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { createForm, deleteField } from "../services";

// const TypeBot = ({ setIsTypebotOpen }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false); // For theme
//   const [formFields, setFormFields] = useState([]); // For form fields
//   const [formInfo, setFormInfo] = useState({
//     formname: "",
//     fields: [],
//   });

//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   const handleClosePopup = () => {
//     setIsTypebotOpen(false); // Close the popup
//   };

//   const handleAddField = (fieldType) => {
//     const fieldId = Date.now().toString(); // Generate a unique ID
//     // Create a new field object
//     const newField = { fieldId, type: fieldType, value: "" };

//     // Add the new field to the form's fields array
//     setFormInfo((prevInfo) => ({
//       ...prevInfo,
//       fields: [...prevInfo.fields, newField],
//     }));

//     // Add to formFields for rendering purposes
//     setFormFields((prevFields) => [
//       ...prevFields,
//       { id: fieldId, type: fieldType },
//     ]);

//     console.log("Form Info After Add:", formInfo);
//   };

//   const handleFieldChange = (id, newValue) => {
//     // Update the specific field's value in formInfo
//     setFormInfo((prevInfo) => ({
//       ...prevInfo,
//       fields: prevInfo.fields.map((field) =>
//         field.fieldId === id ? { ...field, value: newValue } : field
//       ),
//     }));
//   };

//   // Handle deleting a field
//   const handleDeleteField = async (id) => {
//     console.log("handleDeleteField: ", formInfo.formId);
  
//     if (!formInfo.formId) {
//       alert("formId not available. Please save the form first.");
//       return;
//     }
  
//     try {
//       const response = await deleteField(formInfo.formId, id); // Use actual form ID
//       if (response.status === 200) {
//         setFormFields((prevFields) => prevFields.filter((field) => field.id !== id));
//         setFormInfo((prevInfo) => ({
//           ...prevInfo,
//           fields: prevInfo.fields.filter((field) => field.fieldId !== id), // Filter by `fieldId`
//         }));
//       } else {
//         alert("Error deleting field.");
//       }
//     } catch (error) {
//       console.error("Error deleting field:", error);
//       alert("Unexpected error occurred.");
//     }
//   };


//   const handleSave = async () => {
//     if (!formInfo.formname) {
//       alert("Please enter a form name.");
//       return;
//     }
//     if (formInfo.fields.length === 0) {
//       alert("Please add at least one field.");
//       return;
//     }
  
//     try {
//       const res = await createForm(formInfo);
//       if (res.status === 200) {
//         const data = await res.json();
//         alert("Form created successfully!");
//         setFormInfo((prev) => ({ ...prev, formId: data.form_id }));
//       } else if (res.status === 400) {
//         const errorData = await res.json();
//         alert(errorData.message || "Failed to create form");
//       }
//     } catch (error) {
//       console.error("Error creating form:", error);
//       alert("Unexpected error occurred.");
//     }
//   };

//   return (
//     <>
//       <div className={styles.overlay}>
//         <div
//           className={`${styles.container} ${
//             isDarkMode ? styles.lightTheme : styles.darkTheme
//           }`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <nav className={styles.navbar}>
//             <input
//               type="text"
//               placeholder="Enter Form Name"
//               className={styles.input}
//               name="formname"
//               value={formInfo.formname}
//               onChange={(e) =>
//                 setFormInfo({ ...formInfo, formname: e.target.value })
//               }
//             />
//             <div className={styles.navMiddle}>
//               <button className={`${styles.btn} ${styles.flow}`}>Flow</button>
//               <button className={`${styles.btn} ${styles.response}`}>
//                 Response
//               </button>
//             </div>
//             <div className={styles.navRight}>
//               <ThemeToggle
//                 isDarkMode={isDarkMode}
//                 toggleTheme={toggleTheme}
//               />
//               <button className={`${styles.btn} ${styles.share}`}>Share</button>
//               <button className={`${styles.btn} ${styles.save}`} onClick={handleSave}>Save</button>
//               <button className={styles.closebtn} onClick={handleClosePopup}>
//                 <IoClose className={styles.closeIcon} />
//               </button>
//             </div>
//           </nav>
//           <hr />
//           {/* MAIN */}
//           <main className={styles.main}>
//             <div className={styles.mainleft}>
//               <div className={styles.mainleftContainer}>
//                 <h4 className={styles.header}>Bubbles</h4>
//                 <div className={`${styles.bubbles} ${styles.Options}`}>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Text")}
//                   >
//                     <BsChatLeftText className={styles.bubbleIcon} />{" "}
//                     <span>Text</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Images")}
//                   >
//                     <BsFillImageFill className={styles.bubbleIcon} />{" "}
//                     <span>Images</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Video")}
//                   >
//                     <TfiVideoClapper
//                       className={`${styles.bubbleIcon} ${styles.video}`}
//                     />{" "}
//                     <span>Video</span>
//                   </button>
//                   <button
//                     className={`${styles.Option} ${styles.gifContainer}`}
//                     onClick={() => handleAddField("GIF")}
//                   >
//                     <MdOutlineGif
//                       className={`${styles.bubbleIcon} ${styles.gif}`}
//                     />{" "}
//                     <span>GIF</span>
//                   </button>
//                 </div>

//                 <h4 className={styles.header}>Inputs</h4>
//                 <div className={`${styles.Inputs} ${styles.Options}`}>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Input_Text")}
//                   >
//                     <CiText className={styles.inputIcon} /> <span>Text</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Number")}
//                   >
//                     <MdNumbers className={styles.inputIcon} />{" "}
//                     <span>Number</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Email")}
//                   >
//                     <MdAlternateEmail className={styles.inputIcon} />{" "}
//                     <span>Email</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Phone")}
//                   >
//                     <CiPhone className={styles.inputIcon} /> <span>Phone</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Date")}
//                   >
//                     <MdOutlineDateRange className={styles.inputIcon} />{" "}
//                     <span>Date</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Rating")}
//                   >
//                     <CiStar className={styles.inputIcon} /> <span>Rating</span>
//                   </button>
//                   <button
//                     className={styles.Option}
//                     onClick={() => handleAddField("Buttons")}
//                   >
//                     <IoMdCheckboxOutline className={styles.inputIcon} />{" "}
//                     <span>Buttons</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             {/* Main right */}
//             <div className={styles.mainright}>
//               <div>
//                 <button className={styles.startbtn}>
//                   <BsFillFlagFill /> <span> Start</span>
//                 </button>
//               </div>

//               {/* INPUT FIELDS */}
//               {formFields.map((field) => (
//                 <div key={field.id} className={styles.textboxContainer}>
//                   <span className={styles.textboxLabel}>{field.type}</span>
//                   <input
//                     type="text"
//                     placeholder={`Enter ${field.type}`}
//                     className={styles.textboxInput}
//                     value={formInfo.fields.find((f) => f.fieldId === field.id)?.value || ""} // Bind value from formInfo
//                     onChange={(e) => handleFieldChange(field.id, e.target.value)} // Update the specific field
//                   />
//                   <button
//                     className={styles.textboxBtn}
//                     onClick={() => handleDeleteField(field.id)}
//                   >
//                     <RiDeleteBin6Line className={styles.deleteIcon} />
//                   </button>
//                 </div>
//               ))}

//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TypeBot;