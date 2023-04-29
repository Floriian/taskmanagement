import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Avatar,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { TUser } from '../../types';
import { userService } from '../../services/user.service';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '../../app/store/redux-hooks';
import { deepPurple } from '@mui/material/colors';
import { toggleTeam } from '../../app/store/features/user/user.slice';
import { removeTeam } from '../../app/store/features/team/team.slice';
import { teamService } from '../../services/team.service';
export default function Profile() {
  const [fetchedUser, setFetchedUser] = useState<TUser>();
  const [searchUser, setSearchUser] = useState<string>('');
  const [isMatch, setMatch] = useState<boolean>(true);

  const theme = useTheme();

  let { username } = useParams();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      const res = await teamService.leaveTeam();
      if (res.success === true) {
        dispatch(toggleTeam);
        dispatch(removeTeam);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (username != user.username && username) {
      setMatch(false);
      setSearchUser(username);
    }
  }, [username]);

  useEffect(() => {
    if (!isMatch) {
      const fetch = async () => {
        const response = await userService.findUser(searchUser);
        setFetchedUser(response);
      };
      fetch();
    }
  }, [isMatch]);

  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
    >
      <Box>
        <Typography component="h4" variant="h4">
          Profile
        </Typography>
        <Divider />
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              m: 2,
            }}
          >
            {/* <PersonIcon
              sx={{
                width: 64,
                height: 64,
                border: (theme) => `2px solid ${theme.palette.primary.main}`,
                borderRadius: '100%',
              }}
            /> */}
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {user.username[0]}
            </Avatar>
          </Box>
          <Typography>
            Username:
            <Typography component="span" variant="body2">
              {' '}
              {isMatch ? user.username : fetchedUser?.username}
            </Typography>
          </Typography>
          {!isMatch ? (
            <Button color="success" variant="contained">
              Invite to team
            </Button>
          ) : null}
        </Box>
        {user.inTeam ? (
          <Button onClick={handleClick} variant="contained" color="error">
            Leave team.
          </Button>
        ) : null}
      </Box>
    </Container>
  );
}
