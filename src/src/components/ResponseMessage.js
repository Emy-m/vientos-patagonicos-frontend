import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function ResponseMessage(props) {
  const [result, setResult] = React.useState(props.result);
  const [open, setOpen] = React.useState(result !== null);

  useEffect(() => {
    setResult(props.result);
    setOpen(props.result !== null);
  }, [props.result]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    result && (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={result.result}
          sx={{ width: "100%" }}
        >
          {result.message}
        </Alert>
      </Snackbar>
    )
  );
}
