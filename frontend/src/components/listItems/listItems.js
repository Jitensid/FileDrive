import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Divider />
    <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
          <ListItemText style={{ marginLeft: "10px" }} primary="Dashboard" />
        </ListItemIcon>
      </ListItem>
    </NavLink>
    <Divider />
    <NavLink to="/starred" style={{ textDecoration: "none", color: "unset" }}>
      <ListItem button>
        <ListItemIcon>
          <StarOutlineIcon />
          <ListItemText style={{ marginLeft: "10px" }} primary="Starred" />
        </ListItemIcon>
      </ListItem>
    </NavLink>
    <Divider />
  </React.Fragment>
);
