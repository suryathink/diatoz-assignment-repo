import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {

   
     return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUp() {

    const [nameState, setNameState] = useState('');
    const [emailState, setEmailState] = useState("")
    const [passwordState, setPasswordState] = useState("")
  

     const sendDataToServer = async () => {
        try {
          // POST request 
          const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',         
            body: JSON.stringify({
              name: nameState+"",
              email: emailState+"",
              password: passwordState+""
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = await response.json();
          // console.log("Data response from server", data); // Handle the response data from the server as needed
       
          // if (data.ok){
          //   console.log("data",data.data.message)
          //   toast.success(data.data.message);
          // //   Navigate to Login Page here

          // }

          if (!data.ok) {
            console.log("LIne 68",data)
            toast.error(data.error)
          } 
          
          toast.success(data.message)

        

        } catch (error) {
          console.error('Error sending data:', error);
          toast.error("Signup Failed");
        }
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    
   const fullName= data.get('firstName')+ " "+ data.get('lastName')
  

   const email = data.get('email')


   const password = data.get('password')
   setNameState(fullName)
   setEmailState(email)
   setPasswordState(password)

  

   // Call the function to send data to the server after form submission
   await sendDataToServer();
    
//    console.log({
//        //   fullName:data.get('firstName')+ " "+ data.get('lastName'),
//        //   email: data.get('email'),
//        //   password: data.get('password'),
//        fullName:fullName,
//        email: email,
//        password: password,
       
//     });
    
    // console.log(nameState,emailState,passwordState)
  };

  useEffect(() => {
    
    // console.log(nameState, emailState, passwordState);
  }, [nameState, emailState, passwordState]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}