import { Box, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer anchor="left" variant="permanent">
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton>asd</ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
