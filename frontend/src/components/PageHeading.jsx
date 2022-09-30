import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// -----------------------------------------------

PageHeading.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.string,
  boxProps: PropTypes.string,
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
};
export default function PageHeading({
  title,
  subtitle,
  direction = 'row',
  boxProps,
  children,
}) {
  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Stack
        direction={direction}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box {...boxProps}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {children}
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />
    </Box>
  );
}
