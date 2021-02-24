import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AxiosApiInstance from "../axios_instance";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles(() => ({
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

    const formData = new FormData();
    formData.append("file", file);

    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/fileupload/", formData)
    );
  };

  return (
    <React.Fragment>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={validateFile}
        enctype="multipart/form-data"
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
    </React.Fragment>
  );
}

export default FileUpload;
