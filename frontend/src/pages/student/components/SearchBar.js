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


  const onKeyUp = (e) => {
    // for enter
    if (e.charCode === 13) {
      fetchStudent();
    }
  };

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
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={onKeyUp}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={fetchStudent}
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
