import React from "react";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";

function Themechange(props) {
  const changeTheme = () => {
    props.handleThemeChange();
  };

  return (
    <IconButton color="inherit" onClick={changeTheme}>
      <Brightness7Icon />
    </IconButton>
  );
}

export default Themechange;
