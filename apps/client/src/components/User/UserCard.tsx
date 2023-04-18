import React from 'react';
import { TUser } from '../../types';
import { Paper, Divider, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

type Props = {
  user: TUser;
};

export function UserCard({ user }: Props) {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
      }}
      elevation={3}
    >
      <PersonIcon />
      <Typography component="h6" fontWeight="bold">
        {user.username}
      </Typography>
      <Button variant="contained">Go to profile</Button>
    </Paper>
  );
}
