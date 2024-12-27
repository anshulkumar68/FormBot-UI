import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MdPersonOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

const Settings = () => {
  const [settingsFormData, setSettingsFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
            onChange={(e) =>
              setSettingsFormData({
                ...settingsFormData,
                [e.target.name]: e.target.value,
              })
            }
            value={settingsFormData.email}
            name="email"
            placeholder="Update Email"
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
            name="password"
            value={settingsFormData.password}
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
            name="confirmPassword"
            value={settingsFormData.confirmPassword}
            onChange={(e) =>
              setSettingsFormData({
                ...settingsFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <IoEyeOutline className={styles.icon}/>
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.updateBtn}>
          Update
        </button>
      </form>
      </div>
<div className={styles.logoutContainer}>
      <button className={styles.logoutBtn}><IoLogOutOutline /><span>Log out</span></button>
</div>

    </div>
  );
};

export default Settings;
