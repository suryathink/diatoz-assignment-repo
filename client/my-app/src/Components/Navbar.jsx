import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom'
import { ctx } from './Context/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
function NavbarComponent() {
  const navigate = useNavigate()
  const [logoutMessage, setLogoutMessage] = useState('');

  const { isAuth, setIsAuth } = useContext(ctx);
  
  // const handleLogout = () =>{
  //   console.log("Hello");
  //   const token = localStorage.getItem("token")
  //   console.log(token)
    

  // }
  const handleLogout = async () => {
   
    const backendUrl = `http://localhost:8080`;

    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch(`${backendUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Logout successful, you may clear the token and perform any other logout actions.
        localStorage.removeItem('token'); // Clear the token from localStorage.
        setLogoutMessage('Logout successful');
        toast.success('Logout successful')

      } else {
        const data = await response.json();
        console.log(data)
        setLogoutMessage(data.message); // Display any error message from the backend.
        toast.error(data.message)
      }
    } catch (error) {
      setLogoutMessage('Error occurred during logout.');
      toast.error('Error occurred during logout.')

    }
    setIsAuth(false)
    navigate("/login")

  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={()=>{navigate("/")}} >Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate("/")}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate("/favorites")}}>Favorites</Nav.Link>
            <Nav.Link onClick={()=>{navigate("/signup")}}>Signup</Nav.Link>
            {
              isAuth ? <div><Nav.Link onClick={()=>{handleLogout()}}> Logout </Nav.Link> </div>:  <div><Nav.Link onClick={()=>{navigate("/login")}}>Login</Nav.Link></div>
            }
            {/* <Nav.Link onClick={()=>{navigate("/login")}}>Login</Nav.Link> */}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;