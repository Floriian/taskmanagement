import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { red, green, orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux-hooks';
import { toggleCompleted } from '../../team.slice';
import { Task } from '../../../../../../types';
import { TaskModal } from './TaskModal';
import { taskService } from '../../../../../../services/task.service';
import dayjs from 'dayjs';
type Props = {
  task: Task;
};

export function TaskCard({ task }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  const tasks = useAppSelector((state) => state.team.tasks);
  const dispatch = useAppDispatch();

  const isDeadline = dayjs(task.deadline).diff(dayjs(), 'day') < 3;

  const handleClick = (id: number) => {
    setId(id);
    setOpen(!open);
  };

  const handleToggle = async (id: number) => {
    const toggledTask = tasks.filter((task) => task.id == id)[0];
    try {
      const res = await taskService.toggleTaskCompleted(
        id,
        !toggledTask.completed,
      );
      if (res.success) {
        dispatch(toggleCompleted({ id }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {open && id ? <TaskModal id={id} open={open} setOpen={setOpen} /> : null}
      <Card
        sx={{
          minWidth: 250,
          maxWidth: 250,
          width: '100%',
          height: '100%',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: isDeadline ? orange[500] : 'black',
              }}
            >
              {task.taskTitle}
            </Typography>
            <Tooltip title={task.completed ? 'Completed' : 'Uncompleted'}>
              <IconButton onClick={() => handleToggle(task.id)}>
                {task.completed ? (
                  <CheckCircleIcon sx={{ color: green[500] }} />
                ) : (
                  <CloseIcon sx={{ color: red[500] }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body2" color="GrayText">
            Created by {task.createdBy} at
          </Typography>
          <Typography variant="body2" color="GrayText">
            {task.createdAt.toString().split('T')[0]}
          </Typography>
          <Divider />
          <Typography>{task.description.slice(0, 50)}...</Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => handleClick(task.id)}
          >
            Show details
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
