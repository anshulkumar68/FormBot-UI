import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services"; // This makes an API call
import styles from "./Login.module.css";
import { googleIcon, loginTriangle, loginEllipse1, loginEllipse2 } from "../data/imagesData";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Capitalize the username
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!loginFormData.email) {
      newErrors.email = "email is required";
    } else if (!emailRegex.test(loginFormData.email)) {
      newErrors.email = "please enter a valid email address";
    }

    // Password validation
    if (!loginFormData.password) {
      newErrors.password = "password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await login(loginFormData); // Assuming this returns a response with status codes and error messages
      if (res.status === 200) {
        const data = await res.json();

        // Capitalize the username
        const capitalizedUsername = capitalizeFirstLetter(data.username);

        // Store token and capitalized username in localStorage or state
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", capitalizedUsername);

        alert(`Welcome, ${capitalizedUsername}`);
        navigate("/dashboard");
      } else if (res.status === 404) {
        setErrors((prev) => ({ ...prev, email: "user not found" }));
      } else if (res.status === 400) {
        setErrors((prev) => ({ ...prev, password: "password is incorrect" }));
      } else {
        alert("an unknown error occurred.");
      }
    } catch (error) {
      console.error("error logging in:", error);
      alert("an error occurred while logging in.");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.backButton}>
        <IoArrowBack />
      </p>
      <div className={`${styles.shapes} ${styles.triangle}`}>
        <img src={loginTriangle} alt="" />
      </div>
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className={styles.labelContainer}>
          <label className={`${styles.label} ${styles.emailLabel}`}>Email</label>
          <input
          className={styles.input}
            type="text"
            placeholder="Enter your email"
            name="email"
            value={loginFormData.email}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
            }
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className={styles.labelContainer}>
          <label className={styles.label}>Password</label>
          <input
          className={styles.input}
            type="password"
            placeholder="•••••••••••"
            name="password"
            value={loginFormData.password}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
            }
          />
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        </div>

        {/* Buttons */}
        <div className={`${styles.btnContainer} `}>
          <button type="submit" className={`${styles.btn} ${styles.loginbtn}`}>
            Log in
          </button>
          <span>OR</span>
          <button className={`${styles.btn} ${styles.googleContainer}`}>
            <img src={googleIcon} alt="google" />
            Sign in with Google
          </button>
        </div>

        <p className={styles.signuptext}>
          Don't have an account?
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span> Register now</span>
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
  );
};

export default Login;
