import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import IconButton from "@material-ui/core/IconButton";
import Title from "../Title/Title";
import FileOptions from "../FileOptions/FileOptions";
import AxiosApiInstance from "../axios_instance";
import { trackPromise } from "react-promise-tracker";
import ProgressSpinner from "../ProgressSpinner/ProgressSpinner";

// Table Header Component
const TableHeader = () => {
  return (
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Date</TableCell>
      <TableCell>More</TableCell>
      <TableCell align="right">Size</TableCell>
    </TableRow>
  );
};

const DisplayFiles = (props) => {
  useEffect(() => {
    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/fetchfiles/", {}).then(
        (response) => {
          props.setbackendFiles(response.data);
        }
      )
    );
  }, []);

  return (
    <React.Fragment>
      <Title> Your Files </Title>
      <ProgressSpinner></ProgressSpinner>
      <Table size="small">
        <TableBody>
          <TableHeader></TableHeader>
          {props.backendFiles.map((uploadedfile, index) => (
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
                <FileOptions uploadedfile={uploadedfile}></FileOptions>
              </TableCell>
              <TableCell align="right">{uploadedfile.size / 1000} KB</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default DisplayFiles;
