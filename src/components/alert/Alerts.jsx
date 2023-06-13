import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import classes from "./Alerts.module.css";

export default function DescriptionAlerts({ status, close }) {
  if (status === "Success") {
    return (
      <Stack
        onClick={() => close("")}
        className={classes.alert}
        sx={{ width: "100%" }}
        spacing={2}
      >
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Add to cart successfully! — <strong>check it out!</strong>
        </Alert>
      </Stack>
    );
  } else {
    return (
      <Stack
        onClick={() => close("")}
        className={classes.alert}
        sx={{ width: "100%" }}
        spacing={2}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Add to cart error! — <strong>check it out!</strong>
        </Alert>
      </Stack>
    );
  }
}
