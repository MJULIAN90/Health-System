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
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        backgroundColor: "lightgray",
      }}
    >
      <Box
        style={{
          border: "1px solid black",
          // borderRadius:50,
          margin: 30,
          height: "90%",
          width: "40%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <img
          src={images.signContract}
          height={"85.2%"}
          width={"100%"}
          alt='ERROR'
          style={{
            // borderRadius: 50,
            filter: statusContract === "active" && "grayscale(90%)",
          }}
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
          margin: 30,

          height: "90%",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          borderRadius: 20,
        }}
      >
        <img
          src={images.cancelContract}
          height={"70%"}
          width={"100%"}
          alt='ERROR'
          style={{
            borderRadius: 50,
            filter: statusContract === "acepted" && "grayscale(90%)",
          }}
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
