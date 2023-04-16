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
import { useTheme } from '@emotion/react';

export default function Menu() {
  return (
    <AppBar
      position="fixed"
      sx={{
        marginBottom: '1rem',
        width: `calc(100% - ${240})`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
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
  );
}
