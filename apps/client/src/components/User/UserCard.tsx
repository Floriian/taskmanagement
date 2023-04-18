import React from 'react';
import { TUser } from '../../types';
import { Paper, Divider, Typography, Button, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

type Props = {
  user: TUser;
};

export function UserCard({ user }: Props) {
  const navigate = useNavigate();

  const { username: reducerUsername } = useAppSelector((state) => state.user);

  const handleClick = (username: string) => {
    if (username === reducerUsername) {
      navigate(`/profile`);
    } else {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        m: 2,
      }}
      elevation={3}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
      >
        <PersonIcon sx={{ width: 32, height: 32 }} />
        <Typography component="h6" fontWeight="bold">
          {user.username}
        </Typography>
      </Box>
      <Button variant="contained" onClick={() => handleClick(user.username)}>
        Go to profile
      </Button>
    </Paper>
  );
}
