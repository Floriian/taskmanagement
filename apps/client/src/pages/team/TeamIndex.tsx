import React, { useEffect } from 'react';
import { Chat, UserCard } from '../../components';
import { Box, Divider, Typography, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { TUser } from '../../types';
import { teamService } from '../../services/team.service';
import { addTeamMember } from '../../features/team/teamSlice';

export default function TeamIndex() {
  const team = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();
  useEffect(() => {
    teamService.getTeamMembers(team.id!).then((res) => {
      res.map((u) => dispatch(addTeamMember(u)));
    });
  }, []);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <Typography component="h6" variant="h6">
          {team.teamName}
        </Typography>
        <Divider />
        <Typography component="h6" variant="h6" textAlign="center">
          Team members
        </Typography>
        <Box>
          {team.users.map((user) => (
            <UserCard user={user} key={user.username} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
