import { Button } from "@mui/material";
import { Container } from "@mui/material";
import React, { useEffect } from "react";

const Services = ({ services, serviceList }) => {
  useEffect(() => {
    services();
  }, [])

  return (
    <Container id="tr">
      {
        serviceList.length > 0 && serviceList.map(element => {
          let a = document.createElement("div");
          a.innerHTML = `${element}`
          let container = document.getElementById("tr")
          container && container.append(a);
        })
      }
    </Container>
  );
};

export default Services;
