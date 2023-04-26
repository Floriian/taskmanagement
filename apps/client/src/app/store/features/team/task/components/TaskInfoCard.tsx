import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../../redux-hooks';
import { taskService } from '../../../../../../services/task.service';
import { addTask } from '../../team.slice';
export function TaskInfoCard() {
  const task = useAppSelector((state) => state.team.tasks);
  const dispatch = useAppDispatch();

  const completedTasks = task.filter((t) => t.completed === true);
  const uncompletedTasks = task.filter((t) => t.completed === false);

  const deadline = task.filter((t) => {
    const taskDate = dayjs(t.deadline);
    const currentDate = dayjs();
    return taskDate.diff(currentDate, 'days');
  });

  useEffect(() => {
    taskService
      .getTasks()
      .then((res) => {
        for (let task of res) {
          dispatch(addTask(task));
        }
      })
      .catch((e) => {
        return;
      });
  }, []);

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
              {deadline.length} tasks
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
