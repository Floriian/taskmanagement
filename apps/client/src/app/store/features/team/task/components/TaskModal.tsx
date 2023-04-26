import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux-hooks';
import { Avatar, Box, Divider, Modal, Typography, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { toggleCompleted } from '../../team.slice';

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function TaskModal({ id, open, setOpen }: Props) {
  const tasks = useAppSelector((state) => state.team.tasks);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const task = tasks.filter((t) => t.id == id)[0];

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggleClick = (id: number) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <Modal open={open} onClose={handleClick}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          minWidth: '50%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>
          {task.taskTitle}
        </Typography>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: deepPurple[500], mr: '0.5rem' }}>
              {user.username[0]}
            </Avatar>
            <Typography color="GrayText">{user.username}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
            <Typography>
              Created at {`${task.createdAt.toString().split('T')[0]}`}
            </Typography>
          </Box>
        </Box>
        <Box>{task.description}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color={task.completed ? 'warning' : 'success'}
            sx={{ m: 2 }}
            onClick={() => handleToggleClick(task.id)}
          >
            {task.completed ? 'Mark as uncompleted' : 'Mark as completed'}
          </Button>
          <Button variant="outlined" color="error" sx={{ m: 2 }}>
            Delete task.
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}