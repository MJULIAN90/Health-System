import { Button } from "@mui/material";
import React from "react";

const CancelContract = ({ cancelContract }) => {
  return (
    <Button variant="contained" onClick={cancelContract}>
      Cancel Contract
    </Button>
  );
};

export default CancelContract;
