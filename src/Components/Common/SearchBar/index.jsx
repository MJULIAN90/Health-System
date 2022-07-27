import { Button, Grid, Paper, TextField, Toolbar } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  setListRenderFilter,
  list,
  setisSearching,
  name = false,
  wallet = false,
  // setisSearching = () => {},
}) => {
  const handleOnChange = (e) => {
    if (e.target.value.length === 0) {
      setListRenderFilter([]);
      setisSearching(false);
    }

    const dataFilter = list.filter((item) =>
      item[0].toLowerCase().includes(e.target.value.toLowerCase())
    );

    setisSearching(true);
    setListRenderFilter(dataFilter);
  };

  return (
    <Paper>
      <Toolbar>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <SearchIcon color='inherit' sx={{ display: "block" }} />
          </Grid>
          <Grid item xs>
            <TextField
              onChange={handleOnChange}
              fullWidth
              placeholder='Search by email address, phone number, or user UID'
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant='standard'
            />
          </Grid>
          <Grid item>
            <Button variant='contained' sx={{ mr: 0 }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
};

export default SearchBar;
