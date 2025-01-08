import React, { useState } from 'react';
import styles from './TextBox.module.css';
import { RiDeleteBin6Line } from "react-icons/ri";

const TextBox = ({ value = '', onChange, onDelete }) => {
    const [error, setError] = useState("");
  return (
    <>
    <div className={styles.container}>
      <label className={styles.label}>Text</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Click here to edit"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={styles.input}
          />
        <button className={`${styles.btn}`}><RiDeleteBin6Line className={styles.deleteIcon}/></button>
      </div>
    </div>
    </>
  );
};

export default TextBox;
