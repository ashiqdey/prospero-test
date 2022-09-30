import { useState, createContext, useContext } from 'react';
import DEFAULT_COLUMNS from '../data/student-column';
import getSort from '../utils/sort';
import axios from '../utils/axios';

export const studentContext = createContext({
  // columns: [],
  // loading: null,
  data: [],
  // setData: () => { },

  // sort: {},
  // setSort: () => { },

  // page: 1,
  // setPage: () => { },

  // pageSize: 5,
  // setPageSize: () => { },

  // totalPage: 5,
  // setTotalPage: () => { },

  // search: '',
  // setSearch: () => { },

  // onSort: () => {},
  // handleResponse: () => {},
  // fetchStudent: () => { },
});

export function StudentContextProvider({ children }) {
  const columns = [...DEFAULT_COLUMNS];





  // const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  // const [pageSize, setPageSize] = useState(5);



  // const fetchStudent = async () => {
  //   // search, sort and pagination
  //   const params = {
  //     search,
  //     sort_id: sort?.id,
  //     sort_name: sort?.name,
  //     page,
  //     page_size: pageSize,
  //   };

  //   const response = await axios.get(urls.students, { params });

  //   // handle api response
  //   const { data, total_page, page_size, page } = response;
  //   setData({ data });
  //   setTotalPage(total_page);
  //   setPage(page);
  //   setPageSize(page_size);
  // };

  return (
    <studentContext.Provider
      value={{
        // columns,
        // loading,

        data,
        // setData,
        // sort,
        // setSort,
        // page,
        // setPage,
        // pageSize,
        // setPageSize,

        // totalPage,
        // setTotalPage,

        // search,
        // setSearch,

        // onSort,
        // fetchStudent,
      }}
    >
      {children}
    </studentContext.Provider>
  );
}

export function useStudentContext() {
  const {
    // columns,
    // loading,

    data,
    // setData,
    // sort,
    // setSort,
    // page,
    // setPage,
    // pageSize,
    // setPageSize,

    // totalPage,
    // setTotalPage,

    // search,
    // setSearch,

    // onSort,
    // fetchStudent,
  } = useContext(studentContext);

  return {
    // columns,
    // loading,

    data,
    // setData,
    // sort,
    // setSort,
    // page,
    // setPage,
    // pageSize,
    // setPageSize,

    // totalPage,
    // setTotalPage,

    // search,
    // setSearch,

    // onSort,
    // fetchStudent,
  };
}
