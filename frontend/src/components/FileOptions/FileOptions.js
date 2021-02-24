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
        <MenuItem onClick={handleClose}>Other</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default FileOptions;
