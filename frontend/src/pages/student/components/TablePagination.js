import { useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//
// import { useStudentContext } from '../../../contexts/studentContext';

// -----------------------------------------------

const StudentTable = ({ totalPage, page, setPage, pageSize, setPageSize }) => {
  // const { totalPage, page, setPage, pageSize, setPageSize } =
  //   useStudentContext();

  const handleSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const onPageChange = (e, v) => {
    setPage(v);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end">
      <FormControl variant="filled" sx={{ m: 1 }} size="small">
        <InputLabel>Show</InputLabel>
        <Select
          labelId="page-size"
          id="page-size"
          value={pageSize}
          label="Show"
          onChange={handleSizeChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>

      <Pagination
        page={page}
        onChange={onPageChange}
        count={totalPage}
        color="primary"
      />
    </Stack>
  );
};

export default StudentTable;
