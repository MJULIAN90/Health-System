import { Container } from '@mui/material';
import React, { useCallback, useEffect } from 'react';

const ListService = ({ list, method }) => {
  useEffect(() => {
    method();
  }, [])
  

  return (
    <Container id="casa">
      {
        list.length > 0 && list.map(element => {
          let a = document.createElement("div");
          a.innerHTML = `${element.nombre}`
          let container = document.getElementById("casa")
          container.append(a)
        })
      }
    </Container>
  )
}

export default ListService;