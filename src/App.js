import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, purple, pink } from '@mui/material/colors';
import Login from './pages/login';
import NotFound from './pages/notfound';
import Register from './pages/register';
import Home from './pages/home';
import Friends from './pages/friends';
import { AuthProvider, RequireAuth } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/SnackbarContext';

const getDesignTokens = (mode) => ({
  typography: {
    fontFamily: 'Ubuntu',
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: pink,
          divider: pink[100],
          text: {
            primaary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/friends"
              element={
                <RequireAuth>
                  <Friends />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const Layout = () => {
  const [mode, setMode] = React.useState('light');

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Box>
          <Navbar setMode={setMode} mode={mode} />
          <Outlet />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
