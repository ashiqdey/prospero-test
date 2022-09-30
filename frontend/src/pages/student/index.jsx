import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// @mui
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

// components
import PageHeading from '../../components/PageHeading';
import Iconify from '../../components/Iconify';
import AddStudent from '../../dialogs/AddStudent';
import StudentTable from './components/StudentTable';
import TablePagination from './components/TablePagination';

// ---------------

export default function Dashboard() {
  const [addStudentDialog, setAddStudentDialog] = useState(false);

  return (
    <Container maxWidth="xl">
      <PageHeading title="Students" subtitle="Manage all students">
        <Button
          onClick={() => setAddStudentDialog(true)}
          variant="outlined"
          startIcon={<Iconify icon="mdi:account-plus" />}
        >
          Add student
        </Button>
      </PageHeading>

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
