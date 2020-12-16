import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
  },
  tableHead:{
    backgroundColor: theme.palette.primary.main,
    color: "#fff"
  },
  tableBack: {
    backgroundColor: theme.palette.primary.light,
  },
  white:{
    color: "#fff"
  },
  pagination:{
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    '& .MuiSelect-icon': {
      color: "#fff",
    
    },
    '& .MuiIconButton-root.Mui-disabled': {
      color: "#6b6b6b",
    }
  }

}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(TableRow);


const TableComponent = (props) => {
  const classes = useStyles();
  const { rows, columns } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell className={classes.tableHead} key={column.key}>{column.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBack}>
            {rows && rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.updated}>
                  {columns.map((col) => (
                    <TableCell className={classes.white} key={col.key}>
                     {col.format && typeof row[col.key] === 'number' ? col.format(row[col.key]) : row[col.key]}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </Paper>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,

}

export default TableComponent;
