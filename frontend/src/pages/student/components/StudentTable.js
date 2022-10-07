import PropTypes from 'prop-types';
// @mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
//
import Iconify from '../../../components/Iconify';
import getSort from '../../../utils/sort';
import { useStudentContext } from '../../../contexts/studentContext';
import columns from '../../../data/student-column';
import EmptyTable from "./EmptyTable";

// -----------------------------------------------

const headSx = { color: 'primary.main', border: 'unset', cursor: 'pointer' };

// -----------------------------------------------

const StudentTable = () => {
  const {
    loading,
    data,
    sort,
    setSort
  } = useStudentContext();

  const onSort = (field) => {
    // get next sort value
    const sortValue = getSort(sort[field]).next;
    setSort((prev) => ({ ...prev, [field]: sortValue }));
  };


  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 100px)' }}>
        <Table stickyHeader sx={{ minWidth: 600 }}>
          <TableHead sx={{ bgcolor: '#6556ee2e' }}>
            <TableRow>
              {columns.map((cell) => (
                <TableCell
                  key={cell.field}
                  sx={{
                    ...headSx, ...cell?.sx,
                    '&:hover': { bgcolor: cell.sort ? 'rgba(0,0,0,0.03)' : '' }
                  }}
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
            <Loader loading={loading} />
            <EmptyTable empty={data.length === 0} />

            {data.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => {
                  const value = row[column.field];

                  return (
                    <TableCell key={`${row._id}${column.field}`}>
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


function Loader({ loading }) {
  if (!loading) {
    return null;
  }

  return (
    <TableRow>
      <TableCell colSpan={4} sx={{ p: 0 }}>
        <LinearProgress />
      </TableCell>
    </TableRow>
  );
}
Loader.propTypes = {
  loading: PropTypes.bool,
};




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
SortIcon.propTypes = {
  sort: PropTypes.object,
};