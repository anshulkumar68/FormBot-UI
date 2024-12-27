import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MdPersonOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
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
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleUpdate = async (e) =>{
    e.preventDefault();
    console.log(settingsFormData)

    try{
      const res = await updateDetails(settingsFormData);
      if(res.status === 200){
        const data = await res.json();
        console.log(data)
      }
    }
    catch(error){
      console.error("error in updating:", error);
      alert("error in updating");
    }
  }

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
            type="email"
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
          <IoEyeOutline className={styles.icon}/>
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        {/* Old Password */}
        <div className={styles.field}>
          <CiLock className={styles.icon} />
          <input
            className={styles.input}
            type="password"
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
          <IoEyeOutline className={styles.icon}/>
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>

        {/* New Password */}
        <div className={styles.field}>
          <CiLock className={styles.icon} />
          <input
            className={styles.input}
            type="password"
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
          <IoEyeOutline className={styles.icon}/>
          {errors.newPassword && (
            <p className={styles.errorText}>{errors.newPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.updateBtn} onClick={handleUpdate}>
          Update
        </button>
      </form>
      </div>
<div className={styles.logoutContainer} >
      <button className={styles.logoutBtn} onClick={()=>handleLogout(navigate)}><IoLogOutOutline/><span>Log out</span></button>
</div>

    </div>
  );
};

export default Settings;
