import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const [time, setTime] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const counter = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => {
      clearInterval(counter);
    };
  });
  useEffect(() => {
    if (time <= 0) navigate('');
  }, [time]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflowY: 'hidden',
      }}
    >
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          404
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>Page not found.</Typography>
        <Typography variant="caption">Redirect in {time} seconds...</Typography>
        <Button fullWidth variant="contained">
          Redirect
        </Button>
      </Paper>
    </Box>
  );
}
