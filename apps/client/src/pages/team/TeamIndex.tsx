import React from 'react';
import { Chat } from '../../components';
import { Box, Container, Drawer } from '@mui/material';
export default function TeamIndex() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Drawer
          open={true}
          disableAutoFocus
          anchor="left"
          variant="persistent"
          sx={{
            height: 'auto',
            zIndex: '-2',
          }}
        >
          drawer
        </Drawer>
      </Box>
    </>
  );
}
