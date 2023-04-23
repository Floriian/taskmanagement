import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/redux-hooks';
import { Task } from '../../types';
import { Button } from '@mui/material';
import { toggleCompleted } from '../../app/store/features/team/team.slice';

export default function TaskPageById() {
  const [task, setTask] = useState<Task>();

  const { id } = useParams();

  const tasks = useAppSelector((state) => state.team.tasks);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (id) {
      dispatch(
        toggleCompleted({
          id: +id,
        }),
      );
      setTask(tasks.filter((task) => task.id === +id)[0]);
    }
  };

  useEffect(() => {
    if (id) {
      const task = tasks.filter((task) => task.id === +id)[0];
      if (!task) console.log('No task found with given id.');
      setTask(task);
    }
  }, [id, tasks]);

  return (
    <div>
      {task?.taskTitle} {task?.description}
      <Button
        variant="outlined"
        color={task?.completed ? 'error' : 'success'}
        onClick={handleClick}
      >
        {task?.completed
          ? 'Mark task as uncompleted'
          : 'Mark task as completed'}
      </Button>
    </div>
  );
}
