import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Toolbar,
  TablePagination,
} from "@mui/material";

const headCells = [
  {
    id: "name",
    align: "center",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "count",
    align: "center",
    disablePadding: false,
    label: "Count",
  },
  {
    id: "current-price",
    align: "center",
    disablePadding: false,
    label: "Current Price",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { type } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        justifyContent: "center",
      }}
    >
      <Typography sx={{}} variant="h6" id="tableTitle">
        {`Your Available ${type} `}
      </Typography>
    </Toolbar>
  );
};

export default function AvailableMutualFunds(props) {
  const { type, style, rows } = props;

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length - 1) : 0;

  return (
    <Box
      sx={{
        ...style,
        flex: 1,
        my: 2,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "90%", height: "100%", mb: 2 }} elevation={5}>
        <EnhancedTableToolbar setPage={setPage} type={type} />
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 300, height: "100%" }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead rowCount={rows.length} />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const item = Object.values(row);
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {item[0]}
                      </TableCell>
                      <TableCell align="center">{item[1]}</TableCell>
                      <TableCell align="center">{item[2]}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                    position: "relative",
                  }}
                >
                  {rows.length === 0 ? (
                    <TableCell
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      }}
                    >
                      {`No ${type} assets available`}
                    </TableCell>
                  ) : (
                    <TableCell colspan={6} />
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
