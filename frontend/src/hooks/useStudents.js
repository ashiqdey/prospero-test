import { useState } from 'react';


// ----------------------------------------------------------------------

export default function useResponsive(query, key, start, end) {
  const columns = [...DEFAULT_COLUMNS];

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({
    id: 1,
    name: -1,
  });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState('');


  const fetchStudent = async () => {
    // search, sort and pagination
    const params = {
      search,
      sort_id: sort?.id,
      sort_name: sort?.name,
      page,
      page_size: pageSize,
    };

    const response = await axios.get(urls.students, { params });

    // handle api response
    const { data, total_page, page_size, page } = response;
    setData({ data });
    setTotalPage(total_page);
    setPage(page);
    setPageSize(page_size);
  };


  return {
    columns,
    loading,

    data,
    setData,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize,

    totalPage,
    setTotalPage,

    search,
    setSearch,
  };
}
