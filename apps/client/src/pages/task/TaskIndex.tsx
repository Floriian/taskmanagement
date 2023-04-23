import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/store/redux-hooks';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { red, green } from '@mui/material/colors';
import { Task } from '../../types';
import Radio from '@mui/material/Radio';

export default function TaskIndex() {
  const [showType, setShowType] = useState<{
    type: 'ALL' | 'COMPLETED' | 'UNCOMPLETED';
  }>();
  const [tasks, setTasks] = useState<Task[]>();

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/tasks/${id}`);
  };
  const userTasks = useAppSelector((state) => state.team.tasks);
  const completed = userTasks.filter((task) => task.completed === true);
  const uncompleted = userTasks.filter((task) => task.completed === false);

  useEffect(() => {
    setTasks(userTasks);
  }, [userTasks, tasks]);

  const handleRadioClick = ({
    type,
  }: {
    type: 'ALL' | 'COMPLETED' | 'UNCOMPLETED';
  }) => {
    switch (type) {
      case 'ALL':
        setTasks(userTasks);
      case 'COMPLETED':
        setTasks(completed);
      case 'UNCOMPLETED':
        setTasks(uncompleted);
    }
  };

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <FormControl>
          <FormLabel id="radio_buttons">Show</FormLabel>
          <RadioGroup row aria-labelledby="radio_buttons">
            <FormControlLabel
              value="All"
              control={<Radio />}
              label="All"
              onClick={() => handleRadioClick({ type: 'ALL' })}
            />
            <FormControlLabel
              value="Completed"
              control={<Radio />}
              label="Completed"
              onClick={() => handleRadioClick({ type: 'COMPLETED' })}
            />
            <FormControlLabel
              value="Uncompleted"
              control={<Radio />}
              label="Uncompleted"
              onClick={() => handleRadioClick({ type: 'UNCOMPLETED' })}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Divider></Divider>

      {!tasks?.length ? (
        <Alert variant="filled" severity="success">
          No tasks
        </Alert>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {tasks?.map((task) => (
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
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6">{task.taskTitle}</Typography>
                  {task.completed ? (
                    <CheckCircleIcon sx={{ color: green[500] }} />
                  ) : (
                    <CloseIcon sx={{ color: red[500] }} />
                  )}
                </Box>
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
    </Box>
  );
}
