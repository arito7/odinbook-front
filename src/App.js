import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import Login from './pages/login';
import NotFound from './pages/notfound';
import Register from './pages/register';

const theme = createTheme({
  palette: {
    primary: {
      main: purple,
    },
    secondary: {
      main: green,
    },
  },
  spacing: {
    button: {
      padding: '1rem',
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default App;
