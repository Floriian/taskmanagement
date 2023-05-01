import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/store/redux-hooks';
import {
  Alert,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Tooltip,
  IconButton,
  Grid,
} from '@mui/material';
import { Task } from '../../types';
import Radio from '@mui/material/Radio';
import AddIcon from '@mui/icons-material/Add';
import { CreateTaskModal } from '../../app/store/features/team/task/components/CreateTaskModal';
import { TaskCard } from '../../app/store/features/team/task/components/TaskCard';
import dayjs from 'dayjs';
type RadioTypes = 'ALL' | 'COMPLETED' | 'UNCOMPLETED' | 'DEADLINE';

export default function TaskIndex() {
  const [tasks, setTasks] = useState<Task[]>();
  const [type, setType] = useState<RadioTypes>('ALL');
  const [open, setOpen] = useState<boolean>(false);

  const userTasks = useAppSelector((state) => state.team.tasks);
  const completed = userTasks.filter((task) => task.completed === true);
  const uncompleted = userTasks.filter((task) => task.completed === false);
  const deadlines = userTasks.filter((task) => {
    return dayjs(task.deadline).diff(dayjs(), 'day') < 3;
  });

  useEffect(() => {
    setTasks(userTasks);
  }, [userTasks]);

  useEffect(() => {
    switch (type) {
      case 'ALL':
        return setTasks(userTasks);
      case 'COMPLETED':
        return setTasks(completed);
      case 'UNCOMPLETED':
        return setTasks(uncompleted);
      case 'DEADLINE':
        return setTasks(deadlines);
    }
  }, [type]);

  return (
    <Box>
      {open ? <CreateTaskModal open={open} setOpen={setOpen} /> : null}
      <Tooltip title="Add task" onClick={() => setOpen(!open)}>
        <IconButton color="success">
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <FormControl>
          <FormLabel id="radio_buttons">Show</FormLabel>
          <RadioGroup row aria-labelledby="radio_buttons">
            <FormControlLabel
              value={'ALL' as RadioTypes}
              checked={type === 'ALL'}
              control={<Radio />}
              label="All"
              onClick={() => setType('ALL')}
            />
            <FormControlLabel
              value={'COMPLETED' as RadioTypes}
              checked={type === 'COMPLETED'}
              control={<Radio />}
              label="Completed"
              onClick={() => setType('COMPLETED')}
            />
            <FormControlLabel
              value={'UNCOMPLETED' as RadioTypes}
              checked={type === 'UNCOMPLETED'}
              control={<Radio />}
              label="Uncompleted"
              onClick={() => setType('UNCOMPLETED')}
            />
            <FormControlLabel
              value={'DEADLINE' as RadioTypes}
              checked={type === 'DEADLINE'}
              control={<Radio />}
              label="Deadline"
              onClick={() => setType('DEADLINE')}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Divider />
      {!tasks?.length ? (
        <Alert variant="filled" severity="success">
          No tasks
        </Alert>
      ) : null}
      <Box
        sx={{
          margin: 2,
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Grid container spacing={3}>
          {tasks?.map((task) => (
            <Grid key={task.id} sx={{ m: 2 }}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
