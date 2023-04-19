import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { TUser } from '../../types';
import { userService } from '../../services/user.service';
import PersonIcon from '@mui/icons-material/Person';
export default function Profile() {
  const [fetchedUser, setFetchedUser] = useState<TUser>();
  const [isMatch, setMatch] = useState<boolean>(true);
  let { username } = useParams();

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        try {
          const user = await userService.findUser(username);
          setFetchedUser(user);
        } catch (e) {
          console.log(e);
        }
      }
    };
    if (username != user.username) {
      setMatch(false);
      fetchUser();
    }
  }, [username]);

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
            <PersonIcon
              sx={{
                width: 64,
                height: 64,
                border: '2px solid aqua',
                borderRadius: '100%',
              }}
            />
          </Box>
          <Typography>
            Username:
            <Typography component="span" variant="body2">
              {' '}
              {isMatch ? user.username : fetchedUser?.username}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
