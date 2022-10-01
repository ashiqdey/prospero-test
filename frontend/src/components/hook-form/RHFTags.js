import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import FormHelperText from '@mui/material/FormHelperText';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

// ----------------------------------------------------------------------

RHFTags.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
};

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: 48 * 4.5 + 8,
      // width: '250',
    },
  },
};

export default function RHFTags({ name, label, options }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <FormControl>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              fullWidth
              {...field}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label={label}
                  error={!!error}
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            {checkError && (
              <FormHelperText error>{error?.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
