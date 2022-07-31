import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container style={{ textAlign: "center", marginBottom:20 }}>
      <Typography>© {new Date().getFullYear()} Original designs by </Typography>
      <Typography>Martin Julian Ruiz Velásquez </Typography>
      <Typography>Andrés Felipe Velásquez Trujillo</Typography>
    </Container>
  );
};

export default Footer;
