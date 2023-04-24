import React, { useCallback, useEffect, useState } from 'react';
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
  Modal,
  RadioGroup,
  Typography,
  Tooltip,
  IconButton,
  FormGroup,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { red, green } from '@mui/material/colors';
import { CreateTaskSchema, TCreateTask, Task } from '../../types';
import Radio from '@mui/material/Radio';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
type RadioTypes = 'ALL' | 'COMPLETED' | 'UNCOMPLETED';

const today = dayjs();

export default function TaskIndex() {
  const [tasks, setTasks] = useState<Task[]>();
  const [type, setType] = useState<RadioTypes>('ALL');
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TCreateTask>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/tasks/${id}`);
  };
  const userTasks = useAppSelector((state) => state.team.tasks);
  const completed = userTasks.filter((task) => task.completed === true);
  const uncompleted = userTasks.filter((task) => task.completed === false);

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
    }
  }, [type]);

  const handleAddTaskModal = () => {
    setOpen(!open);
  };

  const onFormSubmit: SubmitHandler<TCreateTask> = (data) => {
    console.log(data);
    console.log(date);
  };

  const createTaskModal = (
    <Modal open={open} onClose={handleAddTaskModal}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Create Task
        </Typography>
        <Divider />
        <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
          <FormGroup sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              sx={{ marginBottom: '1rem', marginTop: '1rem' }}
              {...register('taskTitle', { required: true })}
            />
            <Controller
              control={control}
              name="deadline"
              render={({ field: { ref, onBlur, name, ...field } }) => (
                <DatePicker
                  label={'Deadline'}
                  value={today}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: errors.deadline ? true : false,
                      helperText: errors.deadline?.message,
                    },
                  }}
                  {...field}
                />
              )}
            />

            <TextField
              sx={{ marginBottom: '1rem', marginTop: '1rem' }}
              multiline
              label="Description"
              {...register('description', { required: true })}
            />
            <Button type="submit" variant="contained" color="success">
              Create task.
            </Button>
          </FormGroup>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Box>
      {open ? createTaskModal : null}
      <Tooltip title="Add task" onClick={handleAddTaskModal}>
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
