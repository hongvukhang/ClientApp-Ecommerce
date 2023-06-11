import React from "react";
import classes from "./Input.module.css";
export default function Input({ cb, type, placeholder, err, last }) {
  return (
    <input
      className={
        !err
          ? classes["form-input"]
          : `${classes["form-input"]} ${classes.error}`
      }
      style={last && { borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}
      onChange={cb}
      type={type}
      placeholder={placeholder}
    />
  );
}
