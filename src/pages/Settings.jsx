import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MdPersonOutline } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { handleLogout } from "../utils/authLogout";
import { useNavigate } from "react-router-dom";
import { updateDetails } from "../services";

const Settings = () => {
  const navigate = useNavigate();
  const [settingsFormData, setSettingsFormData] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [visibility, setVisibility] = useState({
    email: false,
    oldPassword: false,
    newPassword: false,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await updateDetails(settingsFormData);
      if (res.status === 200) {
        await res.json();
        setSettingsFormData({
          username: "",
          email: "",
          oldPassword: "",
          newPassword: "",
        });
        setErrors({
          oldPassword: "",
          newPassword: "",
        });
        alert("User updated successfully");
      } else if (res.status === 404) {
        const errorData = await res.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          oldPassword: errorData.message || "Incorrect old password",
        }));
      } else if (res.status === 401) {
        const errorData = await res.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: errorData.message || "Password can't be the same",
        }));
      }
    } catch (error) {
      console.error("Error in updating:", error);
      alert("Error in updating");
    }
  };

  const toggleVisibility = (field) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.settingsForm}>
        <span className={styles.title}>Settings</span>
        <form className={styles.formContainer} onSubmit={() => {}}>
          {/* Username */}
          <div className={styles.field}>
            <MdPersonOutline className={styles.icon} />
            <input
              className={styles.input}
              type="text"
              onChange={(e) =>
                setSettingsFormData({
                  ...settingsFormData,
                  [e.target.name]: e.target.value,
                })
              }
              value={settingsFormData.username}
              name="username"
              placeholder="Name"
            />
            {errors.username && (
              <p className={styles.errorText}>{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <CiLock className={styles.icon} />
            <input
              className={styles.input}
              type={visibility.email ? "text" : "password"}
              value={settingsFormData.email}
              name="email"
              placeholder="Update Email"
              onChange={(e) =>
                setSettingsFormData({
                  ...settingsFormData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {visibility.email ? (
              <IoEyeOffOutline
                className={styles.icon}
                onClick={() => toggleVisibility("email")}
              />
            ) : (
              <IoEyeOutline
                className={styles.icon}
                onClick={() => toggleVisibility("email")}
              />
            )}
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Old Password */}
          <div className={styles.field}>
            <CiLock className={styles.icon} />
            <input
              className={styles.input}
              type={visibility.oldPassword ? "text" : "password"}
              placeholder="Old Password"
              name="oldPassword"
              value={settingsFormData.oldPassword}
              onChange={(e) =>
                setSettingsFormData({
                  ...settingsFormData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {visibility.oldPassword ? (
              <IoEyeOffOutline
                className={styles.icon}
                onClick={() => toggleVisibility("oldPassword")}
              />
            ) : (
              <IoEyeOutline
                className={styles.icon}
                onClick={() => toggleVisibility("oldPassword")}
              />
            )}
            {errors.oldPassword && (
              <p className={styles.errorText}>{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className={styles.field}>
            <CiLock className={styles.icon} />
            <input
              className={styles.input}
              type={visibility.newPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              value={settingsFormData.newPassword}
              onChange={(e) =>
                setSettingsFormData({
                  ...settingsFormData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {visibility.newPassword ? (
              <IoEyeOffOutline
                className={styles.icon}
                onClick={() => toggleVisibility("newPassword")}
              />
            ) : (
              <IoEyeOutline
                className={styles.icon}
                onClick={() => toggleVisibility("newPassword")}
              />
            )}
            {errors.newPassword && (
              <p className={styles.errorText}>{errors.newPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.updateBtn}
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
      </div>
      <div className={styles.logoutContainer}>
        <button
          className={styles.logoutBtn}
          onClick={() => handleLogout(navigate)}
        >
          <IoLogOutOutline />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;






// import React, { useState } from "react";
// import styles from "./Settings.module.css";
// import { MdPersonOutline } from "react-icons/md";
// import { IoEyeOutline } from "react-icons/io5";
// import { CiLock } from "react-icons/ci";
// import { IoLogOutOutline } from "react-icons/io5";
// import { handleLogout } from "../utils/authLogout";
// import { useNavigate } from "react-router-dom";
// import { updateDetails } from "../services";

// const Settings = () => {
//   const navigate = useNavigate();
//   const [settingsFormData, setSettingsFormData] = useState({
//     username: "",
//     email: "",
//     oldPassword: "",
//     newPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     oldPassword: "",
//     newPassword: "",
//   });

//   const handleUpdate = async (e) =>{
//     e.preventDefault();

//     try{
//       const res = await updateDetails(settingsFormData);
//       if(res.status === 200){
//         const data = await res.json(); 
//         setSettingsFormData({
//           username: "",
//           email: "",
//           oldPassword: "",
//           newPassword: "",
//         });
//         setErrors({
//           oldPassword: "",
//           newPassword: "",
//         });
//         alert("User updated successfully");
//       }
//       else if(res.status === 404){
//         const errorData = await res.json();
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           oldPassword: errorData.message || "Incorrect old password",
//         }));
//       }
//       else if(res.status === 401){
//         const errorData = await res.json();
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           newPassword: errorData.message || "password can't be same",
//         }));
//       }
//     }
//     catch(error){
//       console.error("error in updating:", error);
//       alert("error in updating");
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.settingsForm}>
//       <span className={styles.title}>Settings</span>
//       <form className={styles.formContainer} onSubmit={() => {}}>
//         {/* Username */}
//         <div className={styles.field}>
//           <MdPersonOutline className={styles.icon} />
//           <input
//             className={styles.input}
//             type="text"
//             onChange={(e) =>
//               setSettingsFormData({
//                 ...settingsFormData,
//                 [e.target.name]: e.target.value,
//               })
//             }
//             value={settingsFormData.username}
//             name="username"
//             placeholder="Name"
//           />
//           {errors.username && (
//             <p className={styles.errorText}>{errors.username}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className={styles.field}>
//           <CiLock className={styles.icon} />
//           <input
//             className={styles.input}
//             type="email"
//             value={settingsFormData.email}
//             name="email"
//             placeholder="Update Email"
//             onChange={(e) =>
//               setSettingsFormData({
//                 ...settingsFormData,
//                 [e.target.name]: e.target.value,
//               })
//             }
//           />
//           <IoEyeOutline className={styles.icon}/>
//           {errors.email && <p className={styles.errorText}>{errors.email}</p>}
//         </div>

//         {/* Old Password */}
//         <div className={styles.field}>
//           <CiLock className={styles.icon} />
//           <input
//             className={styles.input}
//             type="password"
//             placeholder="Old Password"
//             name="oldPassword"
//             value={settingsFormData.oldPassword}
//             onChange={(e) =>
//               setSettingsFormData({
//                 ...settingsFormData,
//                 [e.target.name]: e.target.value,
//               })
//             }
//           />
//           <IoEyeOutline className={styles.icon}/>
//           {errors.oldPassword && (
//             <p className={styles.errorText}>{errors.oldPassword}</p>
//           )}
//         </div>

//         {/* New Password */}
//         <div className={styles.field}>
//           <CiLock className={styles.icon} />
//           <input
//             className={styles.input}
//             type="password"
//             placeholder="New Password"
//             name="newPassword"
//             value={settingsFormData.newPassword}
//             onChange={(e) =>
//               setSettingsFormData({
//                 ...settingsFormData,
//                 [e.target.name]: e.target.value,
//               })
//             }
//           />
//           <IoEyeOutline className={styles.icon}/>
//           {errors.newPassword && (
//             <p className={styles.errorText}>{errors.newPassword}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className={styles.updateBtn} onClick={handleUpdate}>
//           Update
//         </button>
//       </form>
//       </div>
// <div className={styles.logoutContainer} >
//       <button className={styles.logoutBtn} onClick={()=>handleLogout(navigate)}><IoLogOutOutline/><span>Log out</span></button>
// </div>

//     </div>
//   );
// };

// export default Settings;
