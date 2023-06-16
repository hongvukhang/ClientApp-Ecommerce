import React from "react";

import ReactDOM from "react-dom";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import classes from "./Alerts.module.css";

const Status = ({ status, msg }) => {
  return (
    <Stack sx={{ width: "50%" }} spacing={2}>
      <Alert
        variant="filled"
        style={{ borderRadius: "5px" }}
        className={status ? classes["status-success"] : classes["status-error"]}
        severity={status ? "success" : "error"}
      >
        <AlertTitle>{status ? "Success" : "Error"}</AlertTitle>
        {msg} — <strong>check it out!</strong>
      </Alert>
    </Stack>
  );
};

function Alerts({ status, msg, closeHandler }) {
  return ReactDOM.createPortal(
    <div
      onClick={() => closeHandler()}
      id="modal-wrapper"
      className={classes.container}
    >
      <Status status={status} msg={msg} />
    </div>,
    document.querySelector("body")
  );
}

export default Alerts;
