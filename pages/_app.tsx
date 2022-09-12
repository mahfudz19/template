import { useState } from 'react';
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { CssBaseline, colors } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<boolean>(true);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#338722',
        contrastText: "#fff"
      },
      secondary: {
        main: '#1d2127',
        light: '#21252b',
        contrastText: "#fff",
      },
      warning: {
        main: colors.yellow['A400'],
        contrastText: "#999"
      },
      text: {
        secondary:' #6f6c6e;',
      },
      background: {
        default: '#ece7e7'
      },
    },
    typography: {
      fontFamily: [
        "Segoe", "Segoe UI", "DejaVu Sans", "Trebuchet MS", "Verdana", "sans-serif"
      ].join(',')
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: [
        "Segoe", "Segoe UI", "DejaVu Sans", "Trebuchet MS", "Verdana", "sans-serif"
      ].join(',')
    }
  });

  return (
    <ThemeProvider theme={mode ? lightTheme : darkTheme}>
      <CssBaseline />
      <Component mode={mode} change={() => setMode(!mode)} {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
