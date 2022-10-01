import PropTypes from 'prop-types';
// @mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                letterSpacing: '.3rem',
                color: 'inherit',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ width: '100%' }} />

            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Ashiq Dey" src="" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {children}
    </>
  );
}
DashboardLayout.propTypes = {
  children: PropTypes.node,
};
