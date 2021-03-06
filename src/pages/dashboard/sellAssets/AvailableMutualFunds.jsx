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
  Checkbox,
  TextField,
} from "@mui/material";

const headCells = [
  {
    id: "checkbox",
    align: "center",
    disablePadding: true,
    label: "Checkbox",
  },
  {
    id: "asset",
    align: "center",
    disablePadding: false,
    label: "Asset",
  },
  {
    id: "available-units",
    align: "center",
    disablePadding: false,
    label: "Available Units",
  },
  {
    id: "current-price",
    align: "center",
    disablePadding: false,
    label: "Current Price",
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

export default function AvailableMutualFunds(props) {
  const { type, style, mfBeingSold, setMFBeingSold, setSnackbarProps } = props;

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckedChange = (mutualFund, checked) => {
    const updatedMutualFund = {
      ...mutualFund,
      checked: checked,
      sellCount: checked ? mutualFund.sellCount : 0,
    };

    const updatedMfBeingSold = mfBeingSold.map((mf) => {
      if (mf.mfId === mutualFund.mfId) {
        return updatedMutualFund;
      }
      return mf;
    });

    setMFBeingSold(updatedMfBeingSold);
  };

  const handleSellCountChange = (e, mutualFund) => {
    const value = parseInt(e.target.value);
    const exceedsAvailableCount = value > mutualFund.mutualFundUnits;
    if (exceedsAvailableCount) {
      setSnackbarProps({
        open: true,
        severity: "error",
        msg: "Entered count exceeds available count",
      });
    }
    const updatedMutualFund = {
      ...mutualFund,
      sellCount: exceedsAvailableCount ? 0 : value,
      checked: exceedsAvailableCount ? false : true,
    };
    const updatedMfBeingSold = mfBeingSold.map((mf, idx) => {
      if (mf.mfId === mutualFund.mfId) {
        return updatedMutualFund;
      }
      return mf;
    });

    setMFBeingSold(updatedMfBeingSold);
  };

  const handleOnBlurred = (mutualFund) => {
    if (isNaN(mutualFund.sellCount)) {
      const updatedMutualFund = { ...mutualFund, sellCount: 0, checked: false };
      const updatedMfBeingSold = mfBeingSold.map((mf) => {
        if (mf.mfId === mutualFund.mfId) {
          return updatedMutualFund;
        }
        return mf;
      });
      setMFBeingSold(updatedMfBeingSold);
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page >= 0
      ? Math.max(0, (1 + page) * rowsPerPage - mfBeingSold.length - 1)
      : 0;

  return (
    <Box
      sx={{
        ...style,
        height: "95%",
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
            <EnhancedTableHead rowCount={mfBeingSold.length} />
            <TableBody>
              {mfBeingSold
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <Checkbox
                          checked={row.checked}
                          onChange={(e) =>
                            handleCheckedChange(row, e.target.checked)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">{row.mutualFundName}</TableCell>
                      <TableCell align="center">
                        {row.mutualFundUnits}
                      </TableCell>
                      <TableCell align="center">{row.mfValue}</TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          size="small"
                          onBlur={() => {
                            handleOnBlurred(row);
                          }}
                          value={row.sellCount.toString()}
                          onChange={(e) => handleSellCountChange(e, row)}
                          disabled={!row.checked}
                        />
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
                  {mfBeingSold.length === 0 ? (
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
          count={mfBeingSold.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
