import React, { useEffect, useState } from 'react';
import { userService } from '../services/user.service';
import { TNestError, TUser } from '../types';
import {
  Box,
  Modal,
  Typography,
  TextField,
  FormGroup,
  Button,
} from '@mui/material';
import { Link } from '../components';

export default function Home() {
  const [user, setUser] = useState<TUser>();
  const [error, setError] = useState<TNestError>();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    userService.getUser().then(setUser).catch(setError);
  }, []);
  useEffect(() => {
    if (user?.team) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [user?.team]);
  return (
    <>
      {user?.team === null ? (
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
              Please enter an valid invite code!
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
            <Link href="/team/create">Or create a team</Link>
          </Box>
        </Modal>
      ) : null}
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam iure
      dolore vel nam voluptates atque eum explicabo laborum commodi asperiores,
      expedita ipsa corrupti, eius quo magnam aspernatur magni repellat
      eaque!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam iure
      dolore vel nam voluptates atque eum explicabo laborum commodi asperiores,
      expedita ipsa corrupti, eius quo magnam aspernatur magni repellat
      eaque!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam iure
      dolore vel nam voluptates atque eum explicabo laborum commodi asperiores,
      expedita ipsa corrupti, eius quo magnam aspernatur magni repellat
      eaque!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam iure
      dolore vel nam voluptates atque eum explicabo laborum commodi asperiores,
      expedita ipsa corrupti, eius quo magnam aspernatur magni repellat
      eaque!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam iure
      dolore vel nam voluptates atque eum explicabo laborum commodi asperiores,
      expedita ipsa corrupti, eius quo magnam aspernatur magni repellat eaque!
    </>
  );
}
