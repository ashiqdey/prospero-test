import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// @mui
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

// components
import PageHeading from '../../components/PageHeading';
import Iconify from '../../components/Iconify';
import AddStudent from '../../dialogs/AddStudent';
import StudentTable from './components/StudentTable';
import TablePagination from './components/TablePagination';

//
import { urls } from '../../config';
import axios from '../../utils/axios';
// import { useStudentContext } from '../../contexts/studentContext';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// ---------------

export default function Dashboard() {
  // const {
  //   // fetchStudent,
  //   search,
  //   sort,
  //   setData,
  //   // page,
  //   // pageSize,
  //   // setTotalPage,
  //   // setPage,
  //   // setPageSize,
  // } = useStudentContext();
  const isMountedRef = useIsMountedRef();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [sort, setSort] = useState({
    id: 2,
    name: 2,
  });

  // dialog
  const [addStudentDialog, setAddStudentDialog] = useState(false);


  const fetchStudent = async () => {
    // search, sort and pagination
    const params = {
      search,
      page,
      page_size: pageSize,
    };


    if (sort.id === 1 || sort.id === -1) {
      params.sort_id = sort.id
    }
    if (sort.name === 1 || sort.name === -1) {
      params.sort_name = sort.name
    }


    setLoading(true);
    const response = await axios.get(urls.students, { params });

    // handle api response
    setData(response.data);
    setTotalPage(response.total_page);
    setPage(response.page);
    setPageSize(response.page_size);
    setLoading(false);
  };

  useEffect(() => {
    if (isMountedRef.current) {
      fetchStudent();
    }
  }, [page, sort, pageSize]);

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

      <StudentTable
        search={search}
        setSearch={setSearch}
        onSearch={fetchStudent}
        sort={sort}
        setSort={setSort}
        data={data}
        loading={loading}
      />
      <TablePagination
        totalPage={totalPage}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      {addStudentDialog && (
        <AddStudent
          options={addStudentDialog}
          onClose={() => setAddStudentDialog(false)}
        />
      )}
    </Container>
  );
}
