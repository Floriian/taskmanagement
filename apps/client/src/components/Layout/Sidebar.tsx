import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import Menu from './Menu';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppSelector } from '../../app/store/redux-hooks';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};
const drawerWidth = 240;
export default function Sidebar({ children }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();

  // @ts-ignore
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const ui = useAppSelector((state) => state.ui);

  return (
    <Box sx={{ display: 'flex' }}>
      <Menu />
      <Drawer
        variant={matches ? 'permanent' : 'temporary'}
        open={ui.showDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box>
          <List>
            <ListItem disablePadding onClick={() => navigate('/')}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate('/team')}>
              <ListItemButton>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary={'My team'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate('/tasks')}>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={'Tasks'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate('/chat')}>
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={'Chat'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={matches ? { flexGrow: 1, p: 3 } : null}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
