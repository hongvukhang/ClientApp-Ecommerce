import React from "react";
import classes from "./Input.module.css";
export default function Input({ cb, type, placeholder, err }) {
  return (
    <input
      className={
        !err
          ? classes["form-input"]
          : `${classes["form-input"]} ${classes.error}`
      }
      onChange={cb}
      type={type}
      placeholder={placeholder}
    />
  );
}
