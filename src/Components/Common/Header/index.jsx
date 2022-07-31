import * as React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Typography,
  Toolbar,
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Link,
} from "@mui/material";

import { images } from "../../../Assets";

const Header = (props) => {
  const {
    onDrawerToggle,
    balanceContract,
    balanceEthersContract,
    isAdmin,
    isUser,
    isLaboratory,
    balanceClient,
    balanceLaboratory,
  } = props;

  return (
    <React.Fragment>
      <AppBar color='primary' position='sticky' elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={onDrawerToggle}
                edge='start'
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Link
                href='https://github.com/MJULIAN90/sistema_salud_full'
                variant='body2'
                sx={{
                  textDecoration: "none",
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    color: "common.white",
                  },
                }}
                rel='noopener noreferrer'
                target='_blank'
              >
                Go to docs
              </Link>
            </Grid>

            <Grid item>
              <IconButton color='inherit' sx={{ p: 0.2 }}>
                <Avatar
                  src={images.logoWhite}
                  alt='A'
                  sx={{ width: 80, height: 80 }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        color='primary'
        position='static'
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        {isAdmin && (
          <Toolbar>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs>
                <Typography color='inherit' variant='h5' component='h1'>
                  Welcome Admin
                </Typography>
              </Grid>
              <Grid>
                <Grid item>
                  <Typography color='inherit'>
                    Tockens contract: {balanceContract} 🚀
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color='inherit'>
                    Balance contract: {balanceEthersContract} ETH
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        )}

        {isUser && (
          <Toolbar>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs>
                <Typography color='inherit' variant='h5' component='h1'>
                  Welcome
                </Typography>
              </Grid>

              <Grid>
                <Grid item>
                  <Typography color='inherit'>
                    Tockens : {balanceClient} 🚀
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        )}

        {isLaboratory && (
          <Toolbar>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs>
                <Typography color='inherit' variant='h5' component='h1'>
                  Welcome Laboratory
                </Typography>
              </Grid>

              <Grid>
                <Grid item>
                  <Typography color='inherit'>
                    Tockens : {balanceLaboratory} 🚀
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        )}
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
