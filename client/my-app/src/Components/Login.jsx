import  React,{useState,useContext} from 'react';
import { toast } from 'react-toastify';
import  {useNavigate} from "react-router-dom"
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
import { ctx } from './Context/AuthContext';


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

export default function SignIn() {
  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("")
  const {setIsAuth} = useContext(ctx)

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginUser(data.get('email'),data.get('password'))

    setNameState(nameState)
    setEmailState(emailState)
    console.log({
      email: data.get('email'),
      // password: data.get('password'),
    });
  };
   
  async function loginUser(email, password) {
    const apiUrl = 'http://localhost:8080/login'; 
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email+"",
          password: password+"",
        }),
      });
      const userData = await response.json();

      if (!userData.ok) {
        console.log("Response",userData)
        // If the response status is not in the range 200-299, it means an error occurred
        // console.log("UserData Coming from Backend",userData.error)
        // const errorData = await response.json();
        toast.error(userData.error)
      }
  
   
      // console.log("UserData Coming from Backend",userData)
      toast.success(userData.message)
      localStorage.setItem("token",userData.data.data.token)
      setIsAuth(true)
      navigate("/")
    // console.log(userData.data.data.token)
      return userData; 
  
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error("Something Went Wrong",error)

      // throw new Error('Login failed. Please try again.'); // Generic error message for any login failure
    }
  }
  

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
              <p style={{color:"#0079FF",cursor:"pointer"}}  onClick={()=>{navigate("/signup")}}  variant="body2">
               Don't have an account? Sign Up
                </p>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}