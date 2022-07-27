import React, { useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import {
  CreateService,
  NoInfo,
  SearchBar,
  TablePaginationScene,
} from "../../Common";
import { Service } from "../../Common";
import { titlesService } from "../../Common/utils";

const BasicServices = (props) => {
  const {
    getBasicServices,
    listBasicServices,
    onChangeStatusService,
    getCreateService,
    listRenderFilter,
    isSearching,
    setListRenderFilter,
  } = props;

  useEffect(() => {
    getBasicServices();
  }, []);

  const onPressChangeStatus = (name) => {
    onChangeStatusService(name);
  };

  return (
    <>
      <SearchBar {...props} name list={listBasicServices} />
      <Container>
        <Grid container xs={12} mt={1}>
          <Grid item xs={10}>
            <Typography
              style={{
                backgroundColor: "#006db9",
                height: 38,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                color: "white",
              }}
            >
              Basic services
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <CreateService getCreateService={getCreateService} />
          </Grid>
        </Grid>
        <Box>
          {listBasicServices.length === 0 ? (
            <NoInfo
              titlesList={titlesService}
              message={"Not basic services available"}
            />
          ) : (
            <>
              <Paper>
                <TableContainer component={Paper} style={{ height: 400 }}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        {titlesService.map(({ title, position }) => (
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
                      {isSearching &&
                        listRenderFilter.map((service, index) => {
                          return (
                            <Service
                              service={service}
                              typeService
                              onPressChangeStatus={onPressChangeStatus}
                              index={index}
                            />
                          );
                        })}

                      {!isSearching &&
                        listBasicServices.map((service, index) => {
                          return (
                            <Service
                              service={service}
                              typeService
                              onPressChangeStatus={onPressChangeStatus}
                              index={index}
                            />
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePaginationScene listItems={listBasicServices} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default BasicServices;
