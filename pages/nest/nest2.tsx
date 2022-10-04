import * as React from 'react';
import {
  Box, Button, FormControlLabel, FormGroup, Switch, Typography, useTheme
} from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import SimpleCard from '../../Components/Card';
import Laylout from '../../Components/Laylout';
import Sidebar from '../../Components/Sidebar';

const Home: NextPage = ({mode, change}: any) => {
  const theme = useTheme();
  const [auth, setAuth] = useState(true);
  
  const LoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };
  return (
    <>
      <Head>
        <title>Nest 1</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Laylout auth={auth} setAuth={setAuth} mode={mode} change={change}>
        <Typography>Person</Typography>
      </Laylout>
    </>
  )
}

export default Home
