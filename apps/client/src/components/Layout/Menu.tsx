import React from 'react';
import {
  Box,
  AppBar,
  Typography,
  Button,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menu() {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100vw',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit">Profile</Button>
            <Button color="inherit">Logout</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
    // </Box>
  );
}
