import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MdPersonOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";

const Settings = () => {
  const [settingsFormData, setSettingsFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "error",
    email: "error",
    password: "error",
    confirmPassword: "error",
  });

  return (
    <>
      <div className={styles.container}>
        <span>Settings</span>

        <form onSubmit={() => {}}>
          {/* Username */}
          <div className={styles.inputContainer}>
            <MdPersonOutline />
            <input
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
          <div className={styles.inputContainer}>
            <CiLock />
            <input
              type="text"
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
            <IoEyeOutline />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={styles.inputContainer}>
            <CiLock />
            <input
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
            <IoEyeOutline />
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.inputContainer}>
            <CiLock />
            <input
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
            <IoEyeOutline />
            {errors.confirmPassword && (
              <p className={styles.errorText}>{errors.confirmPassword}</p>
            )}
          </div>

          {/* Buttons */}
          <div className={`${styles.btnContainer}`}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.loginbtn}`}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;
