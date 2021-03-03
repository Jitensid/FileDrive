import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <div>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
        <ListItemText primary="Dashboard" />
      </NavLink>
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <StarOutlineIcon />
      </ListItemIcon>
      <NavLink to="/starred" style={{ textDecoration: "none", color: "unset" }}>
        <ListItemText primary="Starred" />
      </NavLink>
    </ListItem>
    <Divider />
  </div>
);
