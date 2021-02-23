import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import IconButton from "@material-ui/core/IconButton";
import Title from "../Title/Title";
import AxiosApiInstance from "../axios_instance";
import { trackPromise } from "react-promise-tracker";
import ProgressSpinner from "../ProgressSpinner/ProgressSpinner";

// Table Header Component
const TableHeader = () => {
  return (
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Date</TableCell>
      <TableCell> Download File</TableCell>
      <TableCell align="right">Size</TableCell>
    </TableRow>
  );
};

const DisplayFiles = () => {
  const [uploadedfiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/fetchfiles/", {}).then(
        (response) => {
          setUploadedFiles(response.data);
        }
      )
    );
  }, []);

  return (
    <React.Fragment>
      <Title> Your Files </Title>
      <Table size="small">
        <TableBody>
          <TableHeader></TableHeader>
          {uploadedfiles.map((uploadedfile, index) => (
            <TableRow key={index}>
              <TableCell>
                {" "}
                <IconButton>
                  <InsertDriveFileIcon> </InsertDriveFileIcon>
                </IconButton>
                {uploadedfile.filename}
              </TableCell>
              <TableCell>{uploadedfile.created}</TableCell>
              <TableCell>
                <IconButton href={uploadedfile.file} download>
                  <CloudDownloadIcon></CloudDownloadIcon>
                </IconButton>
              </TableCell>
              <TableCell align="right">{uploadedfile.size / 1000} KB</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProgressSpinner></ProgressSpinner>
    </React.Fragment>
  );
};

export default DisplayFiles;
