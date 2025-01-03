import React, { useState } from "react";
import { signup } from "../services";
import styles from "./SignUp.module.css";
import { googleIcon, loginTriangle, loginEllipse1, loginEllipse2 } from "../data/imagesData";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const validateForm = () => {
    const newErrors = {};

    if(!formData.username){
      newErrors.username = 'username is required';
    }

    if(!formData.email.trim()){
      newErrors.email = 'Email is required';
    }else if(!/\S+@\S+\.\S+/.test(formData.email)){
      newErrors.email = "email is envalid";
    }
 // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "password must be at least 6 characters long";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await signup(formData);
      if (res.status === 200) {
        alert("registered successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      else {
        console.log(res);
        alert("user already existed");
      }
    } catch (error) {
      console.error("signup error:", error);
      alert("error in signup");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.backButton}>
          <IoArrowBack />
        </p>
        <div className={`${styles.shapes} ${styles.triangle}`}>
          <img src={loginTriangle} alt="" />
        </div>
        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className={styles.labelContainer}>
            <label className={styles.label}>Username</label>
            <input
            className={styles.input}
              type="text"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              value={formData.username}
              name="username"
              placeholder="Enter a username"
            />
            {errors.username && <p className={styles.errorText}>{errors.username}</p>}
          </div>

          {/* Email */}
          <div className={styles.labelContainer}>
            <label className={styles.label}>Email</label>
            <input
            className={styles.input}
              type="text"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              value={formData.email}
              name="email"
              placeholder="Enter your email"
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={styles.labelContainer}>
            <label className={styles.label}>Password</label>
            <input
            className={styles.input}
              type="password"
              placeholder="•••••••••••"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className={styles.labelContainer}>
            <label className={styles.label}>Confirm Password</label>
            <input
            className={styles.input}
              type="password"
              placeholder="•••••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
            {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
          </div>

          {/* Buttons */}
          <div className={`${styles.btnContainer}`}>
            <button type="submit" className={`${styles.btn} ${styles.loginbtn}`}>
              Sign Up
            </button>
            <span>OR</span>
            <button className={`${styles.btn} ${styles.googleContainer}`}>
              <img src={googleIcon} alt="google" />
              Sign Up with Google
            </button>
          </div>

          <p className={styles.signuptext}>
            Already have an account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span> Login</span>
            </Link>
          </p>
        </form>
        <div className={`${styles.shapes} ${styles.ellipse1}`}>
          <img src={loginEllipse1} alt="" />
        </div>
        <div className={`${styles.shapes} ${styles.ellipse2}`}>
          <img src={loginEllipse2} alt="" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
