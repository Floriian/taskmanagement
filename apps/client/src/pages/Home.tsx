import React, { useEffect, useState } from 'react';
import { userService } from '../services/user.service';
import { TNestError, TTeam, TUser } from '../types';
import {
  Box,
  Modal,
  Typography,
  TextField,
  FormGroup,
  Button,
  Container,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
import { Link, TaskInfoCard, TeamInfoCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { teamService } from '../services/team.service';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { setUser } from '../features/user/userSlice';
import { addTask, addTeamMember, setTeam } from '../features/team/teamSlice';
import { AxiosError } from 'axios';
import { taskService } from '../services/task.service';
import { useTheme } from '@emotion/react';

export default function Home() {
  const [error, setError] = useState<TNestError>();
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const user = useAppSelector((state) => state.user);
  const team = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  // @ts-ignore
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    userService
      .getUser()
      .then((res) => {
        dispatch(setUser(res));
      })
      .catch(setError);
  }, []);

  useEffect(() => {
    if (!user.inTeam) {
      teamService
        .getUserTeam()
        .then((res) => {
          dispatch(
            setTeam({
              teamInviteCode: res.teamInviteCode,
              teamName: res.teamName,
              id: res.id,
              tasks: [],
              users: [],
            }),
          );
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            const res: TNestError = e.response?.data;
            setOpen(true);
            setError(res);
          }
        });
    }
  }, []);

  // useEffect(() => {
  //   teamService.getTeamMembers(team.id).then((res) =>
  //     res.users.map((user) => {
  //       dispatch(addTeamMember(user));
  //     }),
  //   );
  // });

  useEffect(() => {
    taskService.getTasks().then((res) => {
      for (let task of res) {
        dispatch(addTask(task));
      }
    });
  }, []);

  useEffect(() => {
    if (team) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [team]);

  const handleClick = () => {
    // setOpen(false);
    navigate('/team/create');
  };

  const createTeamInfo = (
    <Box>
      <Typography>
        To access the full application, please create a team first.
      </Typography>
      <Button onClick={() => navigate('/team/create')} variant="outlined">
        Create team
      </Button>
    </Box>
  );

  const joinTeamModal = (
    <Modal open={open} onClose={handleClose}>
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
          You are not in team!
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Please enter a valid invite code!
        </Typography>
        <FormGroup>
          <TextField
            fullWidth
            label="Invite code"
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </FormGroup>
        <Link href="/team/create" onClick={handleClick}>
          Or create a team
        </Link>
      </Box>
    </Modal>
  );

  return (
    <>
      {!user.inTeam ? joinTeamModal : null}
      {!open && !user.inTeam ? createTeamInfo : null}
      {user.inTeam ? (
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexDirection: matches ? 'row' : 'column',
          }}
        >
          <TeamInfoCard team={team} />
          <TaskInfoCard />
        </Container>
      ) : null}
    </>
  );
}
