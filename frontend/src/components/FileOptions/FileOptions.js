import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

const FileOptions = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const showOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const show_valid_menu_option = (componentname) => {
    if (componentname === "StarredFiles") {
      return <MenuItem onClick={handleClose}>Remove from Starred Files</MenuItem>;
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
        {show_valid_menu_option(props.componentname)}
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default FileOptions;
