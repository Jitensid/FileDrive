import React, { useContext } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AxiosApiInstance from "../axios_instance";
import { trackPromise } from "react-promise-tracker";
import { SnackbarContext } from "../contexts/SnackbarContext/SnackbarContext";

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

function FileUpload(props) {
  const classes = useStyles();
  const SnackbarDetails = useContext(SnackbarContext);

  const validateFile = (e) => {
    let file = e.target.files[0];

    // if file size > 10 MB then reject file upload
    if (file.size > 1e7) {
      e.target.value = null;
      alert("File Size cannot exceed 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // track Axios Request and display progress until request is complete
    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/fileupload/", formData).then(
        (response) => {
          // get all files
          const newbackendFiles = props.backendFiles.slice();
          const first_element = response.data;

          for (var i = newbackendFiles.length - 1; i >= 0; --i) {
            if (newbackendFiles[i].filename === first_element.filename) {
              newbackendFiles.splice(i, 1);
            }
          }

          // Set state of files array with new file
          newbackendFiles.unshift(first_element);
          props.setbackendFiles(newbackendFiles);

          // Display SnackBar after uploading is completed
          SnackbarDetails.setsnackbarstate({
            message: "File Uploaded Successfully",
            open: true,
          });
        }
      )
    );

    // Remove file after file upload is complete
    e.target.value = null;
  };

  return (
    <React.Fragment>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        onInput={validateFile}
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
