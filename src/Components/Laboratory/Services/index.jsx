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
  Service,
  TablePaginationScene,
} from "../../Common";
import { titlesService } from "../../Common/utils";

const Services = (props) => {
  const {
    getSpecialServices,
    specialServiceList,
    onChangeStatusSpecialService,
    getCreateSpecialService,
    isSearching,
    listRenderFilter,
    setisSearching,
  } = props;

  useEffect(() => {
    getSpecialServices();
    setisSearching(false);
  }, []);

  const onPressChangeStatus = (name) => {
    onChangeStatusSpecialService(name);
  };

  return (
    <>
      <SearchBar {...props} isName />
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
              Special services
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <CreateService getCreateService={getCreateSpecialService} />
          </Grid>
        </Grid>
        <Box>
          {specialServiceList.length === 0 ? (
            <NoInfo
              titlesList={titlesService}
              message={"Not services available"}
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
                      {(isSearching
                        ? listRenderFilter
                        : specialServiceList
                      ).map((service, index) => {
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
              <TablePaginationScene listItems={specialServiceList} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Services;
