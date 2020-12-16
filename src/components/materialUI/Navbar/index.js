import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.15)",
    width: `calc(100% - ${drawerWidth}px)`,
  },
  tool: {
      position: "relative",
  },
  menuIcon: {
      position: "absolute",
      right: "20px",
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.tool}>
          <IconButton
            color="primary"
            className={classes.menuIcon}
          >
            <MenuIcon  />
          </IconButton>
          <Typography>
            <h2>Nothing is of greater importance than the conservation of human life.</h2>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
