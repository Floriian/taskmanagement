import React, { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { CreateTaskSchema, TCreateTask } from '../../../../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Divider,
  FormGroup,
  Modal,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { taskService } from '../../../../../../services/task.service';
import { useAppDispatch, useAppSelector } from '../../../../redux-hooks';
import { addTask } from '../../team.slice';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const today = dayjs();
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateTaskModal({ open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TCreateTask>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const task = useAppSelector((state) => state.team.tasks);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const onFormSubmit: SubmitHandler<TCreateTask> = async (data) => {
    try {
      const response = await taskService.createTask({
        deadline: data.deadline,
        description: data.description,
        taskTitle: data.taskTitle,
      });
      dispatch(addTask(response));
      setOpen(false);
    } catch (e) {
      console.log(e);
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
              name="deadline"
              control={control}
              rules={{ required: true }}
              defaultValue={today}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  slotProps={{
                    textField: {
                      error: errors.deadline ? true : false,
                      helperText: errors.deadline?.message,
                    },
                  }}
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
}
