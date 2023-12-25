import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Delete, Edit } from '@mui/icons-material';
import { format } from 'date-fns'


export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    },[]);

    const getData = () => {
        axios.get('/api/users')
            .then(response => {
                console.log('data', response);
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.log('Error', err);
            })
    }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteRecord = (row) => {
    console.log('Row', row);
  }

  const editRecord = (row) => {
    console.log('Row', row);
  }

  const dateFormater = (dateString) => {
    const parseDate = new Date(dateString);
    return format(parseDate, "MMM d, yyyy h:mm a")
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell
                  align="right"
                  style={{ minWidth: 70 }}
                >
                    ID
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
                    User Name
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
                    Email
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
                    Name
                </TableCell>
                <TableCell
                  align="right"
                  style={{ minWidth: 170 }}
                >
                    Created At
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 170 }}
                >
                    Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell key={index} align="right">
                            {row.user_id}
                        </TableCell>
                        <TableCell key={index} align="right">
                            {row.username}
                        </TableCell>
                        <TableCell key={index} align="right">
                            {row.email}
                        </TableCell>
                        <TableCell key={index} align="right">
                            {row.full_name}
                        </TableCell>
                        <TableCell key={index} align="right">
                            {dateFormater(row.registration_date)}
                        </TableCell>
                        <TableCell key={index} align="right">
                            <div className="flex justify-center">
                                <div className="cursor-pointer text-green-600 mr-2" onClick={() => editRecord(row)}><Edit/></div>
                                <div className="cursor-pointer text-orange-600" onClick={() => deleteRecord(row)}><Delete/></div>
                            </div>
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


