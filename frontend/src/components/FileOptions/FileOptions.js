import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import AxiosApiInstance from "../axios_instance";
import { SnackbarContext } from "../contexts/SnackbarContext/SnackbarContext";
import { trackPromise } from "react-promise-tracker";

const FileOptions = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const SnackbarDetails = useContext(SnackbarContext);

  const showOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (filename, fileURL) => {

    AxiosApiInstance.AxiosApiInstance({
      url: fileURL,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });

    handleClose();
  };

  const getIndex = (filename) => {
    console.log(window.location.pathname);
    for (var i = props.backendFiles.length - 1; i >= 0; i--) {
      if (props.backendFiles[i].filename === filename) {
        console.log(props.backendFiles[i]);
        return i;
      }
    }

    return 0;
  };

  const makeRequest = (filename, fileindex, newstatus) => {
    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/changefilestarstatus/", {
        filename: filename,
      }).then(() => {
        const newbackendFiles = props.backendFiles.slice();
        newbackendFiles[fileindex].is_starred = newstatus;

        if (window.location.pathname === "/starred") {
          newbackendFiles.splice(fileindex, 1);
        }

        props.setbackendFiles(newbackendFiles);
        SnackbarDetails.setsnackbarstate({
          message:
            newstatus === true
              ? "Added to Starred Files"
              : "Removed from Starred Files",
          open: true,
        });
      })
    );
  };

  const addtoStarredFiles = (filename) => {
    var fileindex = getIndex(filename);
    makeRequest(filename, fileindex, true);
    handleClose();
  };

  const removefromStarredFiles = (filename) => {
    var fileindex = getIndex(filename);
    makeRequest(filename, fileindex, false);
    handleClose();
  };

  const deleteFile = (filename) => {
    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/deletefile/", {
        filename: filename,
      }).then((response) => {
        const newbackendFiles = props.backendFiles.slice();
        for (var i = newbackendFiles.length - 1; i >= 0; --i) {
          if (newbackendFiles[i].filename === filename) {
            newbackendFiles.splice(i, 1);
          }
        }
        props.setbackendFiles(newbackendFiles);
        SnackbarDetails.setsnackbarstate({
          message: "File Deleted Successfully",
          open: true,
        });
      })
    );

    handleClose();
  };

  const show_valid_menu_option = (fileelement) => {
    if (fileelement.is_starred) {
      return (
        <MenuItem onClick={() => removefromStarredFiles(fileelement.filename)}>
          Remove from Starred Files
        </MenuItem>
      );
    }

    return (
      <MenuItem onClick={() => addtoStarredFiles(fileelement.filename)}>
        Add to Starred Files
      </MenuItem>
    );
  };

  return (
    <React.Fragment>
      <IconButton onClick={showOptions}>
        <MoreVertIcon> </MoreVertIcon>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleDownload(
              props.uploadedfile.filename,
              props.uploadedfile.file
            );
          }}
        >
          {" "}
          <Link
            style={{ textDecoration: "inherit" }}
            href={props.uploadedfile.file}
            color="inherit"
            target="_blank"
            download
          >
            Download
          </Link>{" "}
        </MenuItem>
        {show_valid_menu_option(props.uploadedfile)}
        <MenuItem onClick={() => deleteFile(props.uploadedfile.filename)}>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default FileOptions;
