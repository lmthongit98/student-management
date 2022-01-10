import { Box, Button, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: 'lmthongit98',
        password: '123456',
      })
    );
  };

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button onClick={handleLoginClick} fullWidth variant="contained" color="primary">
            Fake Login
          </Button>
          <Button sx={{ mt: 2 }} onClick={handleLogoutClick} fullWidth variant="outlined" color="primary">
            Fake Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
