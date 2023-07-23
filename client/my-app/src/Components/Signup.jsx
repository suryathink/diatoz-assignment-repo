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
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import CircularProgress from "@mui/material/CircularProgress";


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
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

          if (!data.ok) {
            toast.error(data.error)
          } 
          
          toast.success(data.message)

         navigate("/login")

        } catch (error) {
          console.error('Error sending data:', error);
          toast.error("Signup Failed");
        }
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
   const fullName= data.get('firstName')
   const email = data.get('email')
   const password = data.get('password')
  //  setNameState(fullName)
  //  setEmailState(email)
  //  setPasswordState(password)

   // Call the function to send data to the server after form submission
   await sendDataToServer();
   setLoading(false);
  };


  useEffect(() => {
    
  }, [nameState, emailState, passwordState]);


  const handleEmailChange = (e) => {
    const email = e.target.value;
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    setEmailError(!isValidEmail);
    setEmailState(email);
  };

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
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  onChange={(e)=>setNameState(e.target.value)}
                  autoFocus
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
                  onChange={handleEmailChange}
                  value={emailState}
                  error={emailError}
                  helperText={emailError ? "Please provide valid Email address" : ""} 
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
                  onChange={(e)=>{setPasswordState(e.target.value)}}
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
              disabled={
                nameState === "" ||
                emailState === "" ||
                passwordState === "" ||
                emailError == true ||
                loading
              }
            >
             {loading ? <CircularProgress size={20} /> : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p style={{color:"#0079FF",cursor:"pointer"}}  onClick={()=>{navigate("/login")}}  variant="body2">
                  Already have an account? Sign in
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
  );
}
