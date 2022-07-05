import React, { useEffect } from 'react';
import { Container } from '@mui/material';

const ServiceHistory = ({listServiceHistory, getServiceHistory}) => {
  useEffect(() => {
    console.log("entranso a lista do history");
    getServiceHistory();
  }, [])

  return (
    <Container id="tr">
      {
        listServiceHistory.length > 0 && listServiceHistory.map(element => {
          let a = document.createElement("div");
          a.innerHTML = `${element}`
          let container = document.getElementById("tr")
          container.append(a)
        })
      }
    </Container>
  )
}

export default ServiceHistory;