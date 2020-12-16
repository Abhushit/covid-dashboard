import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import Navbar from "../Navbar";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import covid from "./../../../images/corona-logo.png";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.15)",
    width: drawerWidth,
  },
  logo: {
    width: "300px",
  },
  list: {
    color: "#fff",
  },
  listIcon: {
    color: "#fff",
  },
}));

const lists = [
  { icon: <HomeIcon />, name: "Dashboard", link: "/dashboard" },
  { icon: <BookIcon />, name: "Blogs", link: "/blogs" },
  { icon: <AddBoxIcon />, name: "Hospitals", link: "/hospitals" },
];

const SideDrawer = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        classes={{
          paper: classes.sidebar,
        }}
      >
        <div>
          <Link to="/dashboard">
            <img src={covid} className={classes.logo} />
          </Link>
        </div>
        <Divider />
        <List>
          {lists.map((list, i) => (
            <Link key={i} to={`${list.link}`}>
              <ListItem button className={classes.list}>
                <ListItemIcon className={classes.listIcon}>
                  {list.icon}
                </ListItemIcon>
                <ListItemText>{list.name}</ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
