import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  circularButton: {
    alignItems: "center",
    borderRadius: 25,
    width: 150,
    height: 50,
  },
  iconbtn: {
    alignContent: "left",
    marginRight: "10px",
  },
}));

function FileUpload() {
  const classes = useStyles();

  const uploadFile = () => {
    alert("Select a File ");
  };

  return (
    <div>
      <Button onClick={uploadFile} className={classes.circularButton}>
        <CloudUploadIcon className={classes.iconbtn} />
        Add File
      </Button>
    </div>
  );
}

export default FileUpload;
