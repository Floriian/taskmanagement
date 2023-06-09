import React from 'react';
import {
  Box,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  useMediaQuery,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@emotion/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/redux-hooks';
import { toggleDrawer } from '../../app/store/features/ui/ui.slice';

export default function Menu() {
  const theme = useTheme();
  const navigate = useNavigate();

  // @ts-ignore
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const ui = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleDrawer());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            //Todo: button jumping
            width: '100%',
          }}
        >
          {!matches ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
              }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          {matches ? (
            <Box sx={{ display: 'flex' }}>
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button color="inherit">
                <Link
                  component={RouterLink}
                  to="/logout"
                  sx={{
                    color: 'white ',
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  Logout
                </Link>
              </Button>
            </Box>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
