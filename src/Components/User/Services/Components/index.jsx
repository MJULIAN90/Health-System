import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { NoInfo, Service, TablePaginationScene } from "../../../Common";
import { titlesServicesUser } from "../../../Common/utils";

const ListService = ({ list, method, onBuyService, type }) => {
  useEffect(() => {
    method();
  }, []);

  return (
    <Container>
      <Box style={{ width: "93%" }}>
        {list.length === 0 ? (
          <NoInfo
            message={`we do not have ${
              type === "basic" ? "basic" : "special"
            } services`}
            titlesList={titlesServicesUser}
          />
        ) : (
          <>
            <Paper>
              <TableContainer component={Paper} style={{ height: 400 }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {titlesServicesUser.map(({ title, position }) => (
                        <TableCell
                          align={position}
                          style={{ fontWeight: "bold" }}
                        >
                          {title.toUpperCase()}{" "}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.map((service, index) => {
                      return (
                        <Service
                          service={service}
                          isBuyService
                          onBuyService={onBuyService}
                          key={index}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <TablePaginationScene listItems={list} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default ListService;
