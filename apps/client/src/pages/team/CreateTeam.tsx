import React, { useState } from 'react';
import {
  Container,
  Box,
  FormGroup,
  TextField,
  Button,
  Alert,
  Modal,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateTeamSchema, TCreateTeam, TNestError } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamService } from '../../services/team.service';
import { AxiosError } from 'axios';
import { useAppSelector } from '../../hooks/redux-hooks';
import { Navigate } from 'react-router-dom';

export default function CreateTeam() {
  const [error, setError] = useState<TNestError>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [success, setSucces] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateTeam>({
    resolver: zodResolver(CreateTeamSchema),
  });

  const onFormSubmit: SubmitHandler<TCreateTeam> = async (data) => {
    try {
      const res = await teamService.createTeam(data);
      console.log(res);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          //in team
          setDisabled(true);
          setError(e.response?.data);
        }
        if (e.response?.status === 409) {
          //team name taken
          //TODO
          setError(e.response?.data);
        }
      }
    }
  };

  const leaveTeam = async () => {
    try {
      const res = await teamService.leaveTeam();
      if (res.success) {
        setSucces(true);
        setError(undefined);
        setDisabled(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const successTeamLeaveModal = (
    <Modal open={success} onClose={() => setSucces(false)}>
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
        <Typography>You have successfully left the team.</Typography>
      </Box>
    </Modal>
  );

  if (user.inTeam) {
    return <Navigate to="/team" />;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {success ? successTeamLeaveModal : null}
      <Box
        component="form"
        sx={{ maxWidth: 250 }}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        ) : null}
        <FormGroup>
          <TextField
            label="Team name"
            variant="outlined"
            type="text"
            sx={{ mb: 2 }}
            error={errors.teamName ? true : false}
            helperText={errors.teamName?.message}
            {...register('teamName', { required: true })}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={disabled}
          >
            Submit
          </Button>
          {error ? (
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={leaveTeam}
            >
              Leave team
            </Button>
          ) : null}
        </FormGroup>
      </Box>
    </Container>
  );
}
