import PropTypes from 'prop-types';
import { useState, createContext, useContext } from 'react';
import axios from '../utils/axios';
import { urls } from '../config';
import { getHash } from '../utils/hash';

const MAX_CACHE = 50;

export const studentContext = createContext({
  loading: null,
  data: [],
  setData: () => { },

  sort: {},
  setSort: () => { },

  page: 1,
  setPage: () => { },

  pageSize: 5,
  setPageSize: () => { },

  totalPage: 5,
  setTotalPage: () => { },

  search: '',
  setSearch: () => { },

  fetchStudent: () => { },
});


export function StudentContextProvider({ children }) {

  const [, setCacheHashes] = useState([]);
  const [cache, setCache] = useState({});

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({
    id: 2,
    name: 2,
  });




  const fetchStudent = async () => {
    // search, sort and pagination
    const params = {
      page,
      page_size: pageSize,
    };

    if (search.length > 0) {
      params.search = search
    }
    if (sort.id === 1 || sort.id === -1) {
      params.sort_id = sort.id
    }
    if (sort.name === 1 || sort.name === -1) {
      params.sort_name = sort.name
    }

    // search in cache first
    const hash = getHash(JSON.stringify(params));
    if (cache[hash]) {
      handleResponse(cache[hash]);
      return;
    }


    setLoading(true);
    const response = await axios.get(urls.students, { params });

    handleCache(hash, response);
    handleResponse(response);
  };


  // handle API response cache
  const handleCache = (hash, response) => {
    let remove = null;

    // hash array
    setCacheHashes(prev => {
      const tempHashes = [...prev];

      // check for max allowed entires
      // delete from front end of hash array
      if (tempHashes.length >= MAX_CACHE) {
        remove = tempHashes[0];
        tempHashes.shift();
      }

      // add to hash array, 
      if (!tempHashes.includes(hash)) {
        return [...tempHashes, hash]
      }

      return tempHashes;
    });


    // cache data
    setCache(prev => {
      const tempCache = { ...prev };

      // delete from cache
      if (remove) {
        delete tempCache[remove];
      }

      return { ...tempCache, [hash]: response }
    });
  }


  const handleResponse = (response) => {
    // handle api response
    setData(response.data);
    setTotalPage(response.total_page);
    setPage(response.page);
    setPageSize(response.page_size);
    setLoading(false);
  }



  return (
    <studentContext.Provider
      value={{
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
        fetchStudent,
      }}
    >
      {children}
    </studentContext.Provider>
  );
}
StudentContextProvider.propTypes = {
  children: PropTypes.node,
};



export function useStudentContext() {
  const {
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
    fetchStudent,
  } = useContext(studentContext);

  return {
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
    fetchStudent,
  };
}
