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
import { chatService } from '../../services/chat.service';
import { TChatUser } from '../../types';
function ChatPage() {
  const [messages, setMessages] = useState<TChatUser[]>();

  const chatRef = useRef<HTMLDivElement>();

  useEffect(() => {
    chatService.getChatMessages().then(setMessages).catch(console.log);
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
        {messages?.map((m) => (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              mt: 4,
            }}
            key={m.id}
          >
            <Avatar sx={{ mr: 2 }}>{m.user.username[0]}</Avatar>
            <Typography>{m.message}</Typography>
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
          placeholder="Type something..."
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
