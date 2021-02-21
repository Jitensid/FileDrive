import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Title from "../Title/Title";

import AxiosApiInstance from "../axios_instance";
import { trackPromise } from "react-promise-tracker";

// Generate Order Data
function createData(id, date, name, size) {
  return { id, date, name, size };
}

const rows = [
  createData(0, "Elvis Presley", "16 Mar, 2019", 312.44),
  createData(1, "Paul McCartney", "16 Mar, 2019", 866.99),
];

// Table Header Component
const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Date</TableCell>
        <TableCell align="right">Size</TableCell>
      </TableRow>
    </TableHead>
  );
};

const DisplayFiles = () => {
  const [uploadedfiles, setUploadedFiles] = useState([]);

  useEffect(async () => {
    alert("Fetching Data from Django !!!");
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
        <TableHeader></TableHeader>
        <TableBody>
          {uploadedfiles.map((uploadedfile, index) => (
            <TableRow key={index}>
              <TableCell>
                <InsertDriveFileIcon> </InsertDriveFileIcon>{" "}
                {uploadedfile.filename}
              </TableCell>
              <TableCell>{uploadedfile.created}</TableCell>
              <TableCell align="right">{uploadedfile.size / 1000} KB</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default DisplayFiles;
