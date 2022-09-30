import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';

//
import Iconify from '../../../components/Iconify';
import getSort from '../../../utils/sort';
// import useStudent from '../../../hooks/useStudent';
// import { useStudentContext } from '../../../contexts/studentContext';
import columns from '../../../data/student-column';

// -----------------------------------------------

const headSx = { color: 'primary.main', border: 'unset', cursor: 'pointer' };

// -----------------------------------------------

const StudentTable = ({ loading, data, search, setSearch, onSearch, sort, setSort }) => {
  // const {
  //   columns,
  //   loading,
  //   // sort,
  //   // setSort,
  //   // search,
  //   // setSearch,
  //   // fetchStudent,
  //   data,
  // } = useStudentContext();

  const onSort = (field) => {
    const sortValue = getSort(sort[field]).next;
    setSort((prev) => ({ ...prev, [field]: sortValue }));
  };

  return (
    <>
      <Stack direction="row" sx={{ width: '100%' }} justifyContent="flex-end">
        <FormControl
          sx={{ m: 1, width: '100%', maxWidth: '300px' }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-search">Search student</InputLabel>
          <OutlinedInput
            id="outlined-search"
            placeholder="Search ID, name or email"
            label="Search student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={onSearch}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <Iconify icon="mdi:magnify" />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      {data.length}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: '#6556ee2e' }}>
            <TableRow>
              {columns.map((cell) => (
                <TableCell
                  key={cell.field}
                  sx={{ ...headSx }}
                  onClick={() => {
                    if (cell.sort) {
                      onSort(cell.field);
                    }
                  }}
                >
                  {cell.title}
                  {cell.sort && <SortIcon sort={getSort(sort[cell.field])} />}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={4} sx={{ p: 0 }}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}

            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => {
                  const value = row[column.field];

                  return (
                    <TableCell key={`${row.id}${column.field}`}>
                      {column.render ? column.render(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentTable;

// render sort icon
function SortIcon({ sort }) {
  return (
    <Tooltip title={sort.text} placement="top">
      <Box component="span">
        <Iconify
          sx={{
            width: 20,
            height: 20,
            verticalAlign: 'middle',
            transform: 'translate(8px,-2px)',
          }}
          icon={sort.icon}
        />
      </Box>
    </Tooltip>
  );
}
