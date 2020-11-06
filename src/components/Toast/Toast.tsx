// @ts-nocheck
import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ColorEnum } from "../../models/generic";

interface PropTypes {
  color: ColorEnum;
  message: string;
  open?: boolean;
}

const Toast = (props: PropTypes) => {
  const [open, setOpen] = useState(props.open || true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
      <Alert
        icon={false}
        onClose={handleClose}
        severity={props.color.valueOf()}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
