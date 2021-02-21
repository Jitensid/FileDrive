import React, { useEffect } from "react";
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
  
  useEffect(() => {
    alert("Fetching Data from Django !!!");
    trackPromise(
      AxiosApiInstance.AxiosApiInstance.post("api/test/", {
        dummy: "dummy",
      })
    );
  }, []);

  return (
    <React.Fragment>
      <Title> Your Files </Title>
      <Table size="small">
        <TableHeader></TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <InsertDriveFileIcon> </InsertDriveFileIcon> {row.date}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default DisplayFiles;
