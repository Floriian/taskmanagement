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
} from '@mui/material';
import { Link, TaskInfoCard, TeamStatistics } from '../components';
import { useNavigate } from 'react-router-dom';
import { teamService } from '../services/team.service';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { setUser } from '../features/user/userSlice';

export default function Home() {
  const [team, setTeam] = useState<Omit<TTeam, 'users'>>();
  const [error, setError] = useState<TNestError>();
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    userService
      .getUser()
      .then((res) => {
        dispatch(setUser(res));
      })
      .catch(setError);
  }, []);

  useEffect(() => {
    teamService.getUserTeam().then(setTeam).catch(setError);
  }, []);

  // useEffect(() => {
  //   if (user?.team) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }, [user?.team]);

  const handleClick = () => {
    // setOpen(false);
    navigate('/team/create');
  };

  const warningForNoTeamNoModal = (
    <Box>
      <Typography>
        To access the full application, please create a team first.
      </Typography>
      <Button onClick={() => navigate('/team/create')} variant="outlined">
        Create team
      </Button>
    </Box>
  );

  const warningTeamModal = (
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
      {/* {user?.team === null ? warningTeamModal : null} */}
      <Container>
        {/* {!open && user?.team === null ? warningForNoTeamNoModal : null} */}
        <Box display="flex" justifyContent="center">
          {/* {user?.team ? ( */}
          <>
            <TaskInfoCard title="asd" data={[]} />
            {/* <TeamStatistics team={team!} /> */}
          </>
          {/* ) : null} */}
        </Box>
      </Container>
    </>
  );
}
