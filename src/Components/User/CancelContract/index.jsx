import { Box, Button } from "@mui/material";
import React from "react";
import { images } from "../../../Assets";

const CancelContract = (props) => {
  const {
    cancelContract,
    getActiveContract,
    roleUser: { statusContract },
  } = props;
  
  return (
    <Box
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box
        style={{
          height: "100%",
          width: "49%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <img
          src={images.signContract}
          height={"70%"}
          width={"100%"}
          alt='ERROR'
          style={{ borderRadius: 20 }}
        />
        <Button
          onClick={getActiveContract}
          variant='contained'
          style={{
            height: 80,
            marginTop: 30,
            width: "100%",
            position: "absolute",
            bottom: 0,
            fontWeight: "bold",
            fontSize: 20,
          }}
          disabled={statusContract === "active"}
        >
          Active contract
        </Button>
      </Box>

      <Box
        style={{
          height: "100%",
          width: "49%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <img
          src={images.cancelContract}
          height={"70%"}
          width={"100%"}
          alt='ERROR'
          style={{ borderRadius: 20 }}
        />
        <Button
          onClick={cancelContract}
          variant='contained'
          disabled={statusContract === "acepted"}
          style={{
            height: 80,
            marginTop: 30,
            width: "100%",
            position: "absolute",
            bottom: 0,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Cancel Contract
        </Button>
      </Box>
    </Box>
  );
};

export default CancelContract;
