import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const NoInfo = ({ titlesList, message, sceneMessage, isHeader = false }) => {
  return (
    <>
      {isHeader && (
        <Typography
          style={{
            backgroundColor: "#006db9",
            height: 38,
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 18,
            color: "white",
            marginBottom: 10,
          }}
        >
          {sceneMessage}
        </Typography>
      )}
      <TableContainer
        component={Paper}
        style={{ height: 400, position: "relative" }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {titlesList.map(({ title, position }) => (
                <TableCell align={position} style={{ fontWeight: "bold" }}>
                  {title.toUpperCase()}{" "}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                left: 0,
                right: 0,
                top: 0,
                height: "80%",
                marginTop: "7%",
                "&:hover": {
                  backgroundColor: "lightgray",
                  opacity: [0.9, 0.8, 0.5],
                },
              }}
            >
              {message}
            </Box>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NoInfo;
