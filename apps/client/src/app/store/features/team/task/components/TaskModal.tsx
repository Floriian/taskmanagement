import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux-hooks';
import { Avatar, Box, Divider, Modal, Typography, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { removeTask, toggleCompleted } from '../../team.slice';
import { taskService } from '../../../../../../services/task.service';

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

  const handleDelete = async (id: number) => {
    try {
      setOpen(false);
      const { data } = await taskService.deleteTask(id);
      if (data.success === true) {
        dispatch(removeTask({ id }));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
    }
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
          <Box>
            <Typography>
              Created at {`${task.createdAt.toString().split('T')[0]}`}
            </Typography>
            <Typography>
              Deadline {`${task.deadline.toString().split('T')[0]}`}
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
          <Button
            variant="outlined"
            color="error"
            sx={{ m: 2 }}
            onClick={() => handleDelete(id)}
          >
            Delete task.
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
