import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TNestError, TTeam } from '../../../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux-hooks';
import { teamService } from '../../../../../services/team.service';
import { setTeam } from '../team.slice';
import { AxiosError } from 'axios';
import { toggleNoTeamModal } from '../../ui/ui.slice';

export function TeamInfoCard() {
  const [error, setError] = useState<TNestError>();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const team = useAppSelector((state) => state.team);

  const dispatch = useAppDispatch();

  useEffect(() => {
    teamService
      .getUserTeam()
      .then((res) => {
        dispatch(
          setTeam({
            teamInviteCode: res.teamInviteCode,
            teamName: res.teamName,
            id: res.id,
            tasks: [],
            users: [],
          }),
        );
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          const res: TNestError = e.response?.data;
          dispatch(toggleNoTeamModal);
          setError(res);
        }
      });
  }, []);

  const handleClick = () => {
    navigate('/team');
  };

  return (
    <Card
      variant="elevation"
      sx={{
        minWidth: 250,
        maxWidth: 250,
        m: 2,
      }}
    >
      <CardContent>
        <Typography textAlign="center" variant="subtitle1">
          Team Info
        </Typography>
        <Typography>
          Your team is{' '}
          <Typography
            variant="body1"
            component="span"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {team.teamName}
          </Typography>
          .
        </Typography>
        <Typography>
          Team invite code is{' '}
          <Typography
            variant="body1"
            component="span"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {team.teamInviteCode}
          </Typography>
        </Typography>
        <Button
          onClick={handleClick}
          sx={{
            width: '100%',
          }}
          variant="outlined"
          color="success"
        >
          Go to team.
        </Button>
      </CardContent>
    </Card>
  );
}
