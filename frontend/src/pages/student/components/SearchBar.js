import { useEffect, useRef } from "react";
import { debounce } from "lodash";
// @mui
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
//
import Iconify from '../../../components/Iconify';
import { useStudentContext } from '../../../contexts/studentContext';


// -----------------------------------------------

const SearchBar = () => {
  const {
    fetchStudent,
    search,
    setSearch,
  } = useStudentContext();



  const debouncedSearch = useRef(
    debounce(async (search) => {
      if (search.length !== 0) {
        // console.log('debounce', criteria);
        await fetchStudent({ search });
      }
    }, 500)
  ).current;



  const onKeyUp = (e) => {
    // for enter
    if (e.charCode === 13 && search.length !== 0) {
      fetchStudent();
    }
  };


  const onChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };


  useEffect(() => {
    // clean when un mounted 
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);


  return (
    <Stack direction="row" sx={{ width: '100%' }} justifyContent="flex-end">
      <FormControl
        sx={{ mb: 3, width: '100%', maxWidth: { sm: '350px' } }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-search">Search student</InputLabel>
        <OutlinedInput
          id="outlined-search"
          placeholder="Search ID, name or email"
          label="Search student"
          value={search}
          onChange={onChange}
          onKeyPress={onKeyUp}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (search.length !== 0) {
                    fetchStudent()
                  }
                }}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <Iconify icon="mdi:magnify" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Stack>
  );
};

export default SearchBar;
