import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import AxiosApiInstance from "../axios_instance";
import { trackPromise } from "react-promise-tracker";

const FileOptions = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const showOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      })
    );

    handleClose();
  };

  const show_valid_menu_option = (starred) => {
    if (starred) {
      return (
        <MenuItem onClick={handleClose}>Remove from Starred Files</MenuItem>
      );
    }

    return <MenuItem onClick={handleClose}>Add to Starred Files</MenuItem>;
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
        <MenuItem onClick={handleClose}>
          {" "}
          <Link
            style={{ textDecoration: "inherit" }}
            href={props.uploadedfile.file}
            color="inherit"
            download
          >
            Download
          </Link>{" "}
        </MenuItem>
        {show_valid_menu_option(props.uploadedfile.is_starred)}
        <MenuItem onClick={() => deleteFile(props.uploadedfile.filename)}>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default FileOptions;
