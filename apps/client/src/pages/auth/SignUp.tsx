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
import { SignUpSchema, TNestError, TSignUp } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { authService } from '../../services/auth.service';

export function Signup() {
  const [error, setError] = useState<TNestError>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema),
  });

  const onFormSubmit: SubmitHandler<TSignUp> = async (data) => {
    try {
      const res = await authService.signUp(data);
      if (res.data.access_token)
        localStorage.setItem('access_token', res.data.access_token);
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
      >
        <Box
          component="form"
          width="full"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ marginBottom: '1rem' }}
          >
            Sign up
          </Typography>
          {error ? (
            <Alert
              severity="error"
              sx={{
                marginBottom: '1rem',
              }}
              variant="filled"
            >
              <AlertTitle>
                {error.statusCode === 404 ? 'Not Found' : 'Error'}
              </AlertTitle>
              {Object.values(error.message).map((msg) => (
                <Typography
                  key={msg}
                  sx={{
                    ':first-letter': {
                      textTransform: 'uppercase',
                    },
                  }}
                >
                  {msg}
                </Typography>
              ))}
            </Alert>
          ) : null}
          <FormGroup>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              type="text"
              sx={{ marginBottom: '1rem' }}
              error={errors.username ? true : false}
              helperText={errors.username?.message}
              {...register('username')}
            />
            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              type="email"
              sx={{ marginBottom: '1rem' }}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="text"
              sx={{ marginBottom: '1rem' }}
              error={errors?.password ? true : false}
              helperText={errors.password?.message}
              {...register('password')}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              sx={{ marginBottom: '1rem' }}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword')}
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
          <Link href="/auth/sign-in">Already have an account? Sign in!</Link>
        </Box>
      </Box>
    </Container>
  );
}
