import React from 'react';
import { useAppSelector } from '../../app/store/redux-hooks';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function TaskIndex() {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/tasks/${id}`);
  };
  const tasks = useAppSelector((state) => state.team.tasks);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {!tasks.length ? (
        <Alert variant="filled" severity="success">
          No tasks
        </Alert>
      ) : null}
      {tasks.map((task) => (
        <Card
          sx={{
            minWidth: 250,
            maxWidth: 250,
            m: 2,
            width: '100%',
          }}
          key={task.id}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Box>
              <Typography variant="h6">{task.taskTitle}</Typography>
              <Typography variant="body2" color="GrayText">
                Created by {task.createdBy} at
              </Typography>
              <Typography variant="body2" color="GrayText">
                {task.createdAt.toString().split('T')[0]}
              </Typography>
              <Divider />
            </Box>
            <Typography>{task.description.slice(0, 50)}...</Typography>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              onClick={() => handleClick(task.id)}
            >
              Go to task
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
