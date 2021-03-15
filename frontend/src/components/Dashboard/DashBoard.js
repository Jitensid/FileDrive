import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Themechange from "../Themechange/Themechange";
import RepoLink from "../RepoLink/RepoLink";
import LogoutMenu from "../LogoutMenu/LogoutMenu";
import { ListItem } from "@material-ui/core";
import FileUpload from "../FileUpload/FileUpload";
import DisplayFiles from "../DisplayFiles/DisplayFiles";
import StarredFiles from "../StarredFiles/StarredFiles";
import SnackbarMessage from "../SnackbarMessage/SnackbarMessage";
import { mainListItems } from "../listItems/listItems";
import { Route } from "react-router-dom";
import { SnackbarContextProvider } from "../contexts/SnackbarContext/SnackbarContext";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-start",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  iconbutton: {
    padding: "500 px",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const [backendFiles, setbackendFiles] = useState([]);

  return (
    <SnackbarContextProvider>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, classes.appBarShift)}
        >
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              React Drive
            </Typography>
            <RepoLink className={classes.iconbutton}></RepoLink>
            <Themechange handleThemeChange={props.handleThemeChange} />
            <LogoutMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper),
          }}
          open={true}
        >
          <div className={classes.toolbarIcon}></div>
          <List>
            {" "}
            <ListItem>
              {" "}
              <FileUpload
                backendFiles={backendFiles}
                setbackendFiles={setbackendFiles}
              />{" "}
            </ListItem>{" "}
          </List>
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Route
              path="/"
              exact
              render={() => (
                <DisplayFiles
                  backendFiles={backendFiles}
                  setbackendFiles={setbackendFiles}
                ></DisplayFiles>
              )}
            />
            <Route
              path="/starred"
              render={() => (
                <StarredFiles
                  backendFiles={backendFiles}
                  setbackendFiles={setbackendFiles}
                ></StarredFiles>
              )}
            />
            <Box pt={4}></Box>
            <SnackbarMessage></SnackbarMessage>
          </Container>
        </main>
      </div>
    </SnackbarContextProvider>
  );
}
