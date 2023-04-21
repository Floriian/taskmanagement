import React, { useEffect } from 'react';
import { UserCard } from '../../components';
import { Box, Divider, Typography, Container } from '@mui/material';
import { teamService } from '../../services/team.service';
import { useAppDispatch, useAppSelector } from '../../app/store/redux-hooks';
import { addTeamMember } from '../../app/store/features/team/team.slice';

export default function TeamIndex() {
  const team = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();
  useEffect(() => {
    teamService.getTeamMembers(team.id!).then((res) => {
      res.map((u) => dispatch(addTeamMember(u)));
    });
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          minWidth: 'calc(100% - 20px)',
        }}
      >
        <Typography component="h6" variant="h6" textAlign="center">
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
