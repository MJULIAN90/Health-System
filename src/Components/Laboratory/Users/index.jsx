import {  Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

const Users = ({ listServiceHistory, getUsersHistory }) => {

  useEffect(() => {
    getUsersHistory()
  }, [])

  return (
    <Container >
      {
          listServiceHistory.length === 0 ? 'we do not have users' : listServiceHistory.map(element => {

          return (
            <>
              <Typography >Client {element[1]} </Typography>
              <Typography >Name service {element[4]} </Typography>
              <Typography >Price {element[3]} </Typography>
            </>
          )
        })
      }
    </Container>
  )
};

export default Users;
