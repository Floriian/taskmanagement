import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Response = {
  status: string;
  code: number;
  total: number;
  data: Array<{
    title: string;
    author: string;
    genre: string;
    content: string;
  }>;
};

function ChatPage() {
  const [items, setItems] = useState<Response>();

  const chatRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios<Response>(
        'https://fakerapi.it/api/v1/texts?_quantity=100&_characters=2000',
      );
      setItems(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: chatRef.current?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box ref={chatRef} sx={{ scrollBehavior: 'smooth' }}>
        {items?.data.map((d, i) => (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              mt: 4,
            }}
            key={d.author}
          >
            <Avatar sx={{ mr: 2 }}>{d.author[0]}</Avatar>
            <Typography>{d.content}</Typography>
            <Divider />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '0px',
          bgcolor: 'Background',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
        component="form"
      >
        <TextField
          sx={{
            width: 'calc(100% - 20%)',
            m: 2,
          }}
        />
        <Tooltip title="Send">
          <IconButton color="primary" type="submit">
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ChatPage;
