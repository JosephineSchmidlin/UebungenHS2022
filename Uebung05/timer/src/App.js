import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Timer from './Timer';

function App() {


  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h4">Counter</Typography>
        </Toolbar>
      </AppBar>

  
      <Timer countdown="20"/>   
   
    </>
  );
}

export default App;

