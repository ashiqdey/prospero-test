// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//
import { useStudentContext } from '../../../contexts/studentContext';

// -----------------------------------------------

const StudentTable = () => {
  const {
    totalPage,
    page,
    setPage,
    pageSize,
    setPageSize
  } = useStudentContext();

  const onPageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const onPageChange = (event, page) => {
    setPage(page);
  };

  return (
    <Stack
      direction={{ xs: "row", sm: "row" }}
      alignItems={{ sm: "center" }}
      justifyContent={{ xs: "center", sm: "flex-end" }}
      sx={{ py: 2, flexWrap: 'wrap' }}
    >
      <Box sx={{ ml: 'auto' }}>
        <FormControl variant="filled" sx={{ m: 1 }} size="small">
          <InputLabel>Show</InputLabel>
          <Select
            labelId="page-size"
            id="page-size"
            value={pageSize}
            label="Show"
            onChange={onPageSizeChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
