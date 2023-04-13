import React, { useState } from 'react';
import { Link } from '../../components';
import {
  Box,
  Container,
  Typography,
  FormGroup,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema, TSignIn } from '../../types/auth.type';
import { TNestError } from '../../types';
import { AxiosError } from 'axios';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { authSlice, setToken, setUser } from '../../features/auth/authSlice';

export function SignIn() {
  const [error, setError] = useState<TNestError>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
  });

  //TODO if has access token, and it is valid, redirect to home page.
  // const user = useAppSelector((state) => state.auth.userToken);
  const dispatch = useAppDispatch();

  const onFormSubmit: SubmitHandler<TSignIn> = async (data) => {
    try {
      const res = await authService.signIn(data);
      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token);
        dispatch(setToken(res.data.access_token));
        navigate('/', { replace: true });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data);
      }
    }
  };

  return (
    <Container sx={{ overflow: 'hidden' }} maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
        minWidth="xs"
        maxWidth="xs"
        width="full"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
          width="full"
        >
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ marginBottom: '1rem' }}
          >
            Sign in
          </Typography>
          {error ? (
            <Alert
              severity="error"
              sx={{ marginBottom: '1rem' }}
              variant="filled"
            >
              <AlertTitle>
                {error.statusCode === 404 ? 'Not Found' : 'Error'}
              </AlertTitle>
              <Typography
                sx={{
                  ':first-letter': {
                    textTransform: 'uppercase',
                  },
                }}
              >
                {error.message}
              </Typography>
            </Alert>
          ) : null}
          <FormGroup>
            <TextField
              fullWidth
              label="Username/Email"
              variant="outlined"
              type="text"
              sx={{ marginBottom: '1rem' }}
              error={errors.credential ? true : false}
              helperText={errors.credential?.message}
              {...register('credential', { required: true })}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              sx={{ marginBottom: '1rem' }}
              error={errors.password ? true : false}
              helperText={errors.credential?.message}
              {...register('password', { required: true })}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                padding: '1rem',
              }}
            >
              Sign in
            </Button>
          </FormGroup>
          <Link href="/auth/sign-up">You dont have an account? Sign Up!</Link>
        </Box>
      </Box>
    </Container>
  );
}
