import * as React from 'react';
import {
  AppBar, Avatar, Box, Button, TextField, Toolbar, Typography, IconButton, Grid,
  Switch, FormControlLabel, FormGroup, MenuItem, Menu, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CabinRoundedIcon from '@mui/icons-material/CabinRounded';
import { shadows } from '@mui/system';
import { makeStyles, useTheme } from '@mui/styles';

export default function MenuAppBar() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box>
      <Box display='flex'>
        <Box bgcolor={'primary.main'} height='100vh' width='42%' />
        <Box height='100vh' width='58%' />
      </Box>
      <Box p={theme.spacing(2)} bgcolor={{ md: '#ffffff00', xs: '#fff'}} width={{sm: '70%', xs: '95%'}} borderRadius={theme.shape.borderRadius / 2} position='absolute' sx={{ boxShadow: 20, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {upMd && (
            <Grid item xs={5}>
              <Box p={theme.spacing(2)} textAlign='center'>
                <CabinRoundedIcon sx={{ fontSize: 100 }} />
                <Typography sx={{ fontSize: 30 }} >name with style</Typography>
                <Typography>name of website can be put here</Typography>
                <Typography>Long name of website can be put here</Typography>
              </Box>
            </Grid>
          )}
          <Grid item md={7} sm={12} xs={12}>
            <Typography textAlign='right'>NeedHelp?</Typography>
            <Box my={theme.spacing(10)}>
              <Typography variant='h6' component={'h1'} textAlign='center'>Login</Typography>
              <Box mb={theme.spacing(3)}>
                <Typography variant='h6' component={'h1'}>Email</Typography>
                <TextField fullWidth margin='normal' label="joe@email.com" variant="outlined" />
              </Box>
              <Box mb={theme.spacing(6)}>
                <Typography variant='h6' component={'h1'}>Pawword</Typography>
                <TextField fullWidth margin='normal' label="Enter your Password" variant="outlined" />
                <Typography textAlign='right'>forget password?</Typography>
              </Box>
              <Button href='/' fullWidth variant="contained" size="large">
                Large
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
