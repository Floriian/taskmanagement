import React from 'react';
import { TUser } from '../../types';
import { Paper } from '@mui/material';

type Props = {
  user: TUser;
};

export function UserCard({ user }: Props) {
  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return <Paper>asd{user.username}</Paper>;
}
