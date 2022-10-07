import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
//
import Illustration from "../../../components/illustration/doc";


function EmptyTable({ empty }) {
  if (!empty) {
    return null;
  }

  return (
    <TableRow>
      <TableCell colSpan={4}>
        <Stack spacing={2} sx={{ px: 0, py: 4, textAlign: 'center' }}>
          <Illustration sx={{ width: 150, m: 'auto' }} />
          <Typography variant="font5">No Data found</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
EmptyTable.propTypes = {
  empty: PropTypes.bool,
};

export default EmptyTable;