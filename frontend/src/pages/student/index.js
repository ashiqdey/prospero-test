import { useState, useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// components
import PageHeading from '../../components/PageHeading';
import Iconify from '../../components/Iconify';
import AddStudent from '../../dialogs/AddStudent';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';
import TablePagination from './components/TablePagination';
//
import { useStudentContext } from '../../contexts/studentContext';

// ---------------

export default function Dashboard() {
  const {
    fetchStudent,
    sort,
    page,
    pageSize,
  } = useStudentContext();

  // dialog
  const [addStudentDialog, setAddStudentDialog] = useState(false);


  useEffect(() => {
    fetchStudent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, pageSize]);

  return (
    <Container maxWidth="xl">
      <PageHeading title="Students" subtitle="View and manage students">
        <Button
          onClick={() => setAddStudentDialog(true)}
          variant="outlined"
          size='large'
          startIcon={<Iconify icon="mdi:account-plus" />}
        >
          Add
          <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>student</Box>
        </Button>
      </PageHeading>

      <SearchBar />
      <StudentTable />
      <TablePagination />

      {addStudentDialog && (
        <AddStudent
          options={addStudentDialog}
          onClose={() => setAddStudentDialog(false)}
        />
      )}
    </Container>
  );
}
