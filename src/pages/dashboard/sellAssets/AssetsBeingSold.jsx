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
    id: "asset-name",
    align: "center",
    disablePadding: true,
    label: "Asset Name",
  },
  {
    id: "units-to-be-sold",
    align: "center",
    disablePadding: false,
    label: "Units to be Sold",
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
        {type}
      </Typography>
    </Toolbar>
  );
};

export default function AssetsBeingSold(props) {
  const { type, style, assetsBeingSold } = props;

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
    page >= 0
      ? Math.max(0, (1 + page) * rowsPerPage - assetsBeingSold.length - 1)
      : 0;

  return (
    <Box
      sx={{
        ...style,
        mt: 1,
        height: "50%",
        width: "60%",
        minWidth: 756,
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
            <EnhancedTableHead rowCount={assetsBeingSold.length} />
            <TableBody>
              {assetsBeingSold
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const item = Object.values(row);
                  const assetName = item[1];
                  const sellCount = item[item.length - 1];
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {assetName}
                      </TableCell>
                      <TableCell align="center">
                        {sellCount.toString()}
                      </TableCell>
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
                  {assetsBeingSold.length === 0 ? (
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
                    <TableCell colSpan={5} />
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={assetsBeingSold.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
