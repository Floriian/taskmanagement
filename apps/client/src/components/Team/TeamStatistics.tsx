import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { TTeam } from '../../types';
import { useNavigate } from 'react-router-dom';

type Props = {
  team: Omit<TTeam, 'users'>;
};

export function TeamStatistics({ team }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/team');
  };

  return (
    <Card
      variant="elevation"
      sx={{
        minWidth: 178,
        maxWidth: 250,
        ml: 2,
        mr: 2,
      }}
    >
      <CardContent>
        <Typography textAlign="center" variant="subtitle1">
          Team statistics
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
