import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Loader = () => (
  <Box
    style={{
      position: 'relative',
      width: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9999',
    }}
  >
    <LinearProgress color="primary" />
  </Box>
);

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
