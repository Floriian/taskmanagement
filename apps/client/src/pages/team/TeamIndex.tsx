import React, { useEffect, useState } from 'react';
import { Chat, UserCard } from '../../components';
import { Box, Divider, Typography, Container } from '@mui/material';
import { useAppSelector } from '../../hooks/redux-hooks';
import { TUser } from '../../types';
import { teamService } from '../../services/team.service';

export default function TeamIndex() {
  const [teamUsers, setTeamUsers] = useState<TUser[]>();
  const team = useAppSelector((state) => state.team);

  // useEffect(() => {
  //   teamService.getTeamMembers(team.id!).then((res) => setTeamUsers(res.users));
  // }, []);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <Typography component="h1">{team.teamName}</Typography>
        <Divider />
        <Typography>Team members</Typography>
        <Box>
          {team.users.map((user) => (
            <UserCard user={user} key={user.username} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
