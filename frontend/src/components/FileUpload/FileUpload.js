import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
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
  input: {
    display: "none",
  },
}));

function FileUpload() {
  const classes = useStyles();

  const validateFile = (e) => {
    let file = e.target.files[0];

    if (file && file.size > 10e6) {
      alert("Upload a smaller File");
      return;
    }
  };

  return (
    <div>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={validateFile}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          component="span"
          className={classes.circularButton}
        >
          <CloudUploadIcon className={classes.iconbtn} />
          Add File
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
    </div>
  );
}

export default FileUpload;
