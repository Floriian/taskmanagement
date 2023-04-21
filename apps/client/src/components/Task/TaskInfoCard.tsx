import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useAppSelector } from '../../app/store/redux-hooks';
export function TaskInfoCard() {
  const task = useAppSelector((state) => state.team.tasks);

  const completedTasks = task.filter((t) => t.completed === true);
  const uncompletedTasks = task.filter((t) => t.completed === false);

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
          Task statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">Completed</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body1" color="green">
              {completedTasks.length} tasks
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Uncompleted</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body1" color="red">
              {uncompletedTasks.length} tasks
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Deadline</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" variant="body1" color="orange">
              300 tasks
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
