

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ctx } from "./Context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from '@mui/icons-material/Login';

function NavbarComponent() {
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuth, setIsAuth } = useContext(ctx);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const backendUrl = `https://pantyhose-dugong.cyclic.app`;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${backendUrl}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token"); // Clear the token from localStorage.
        setLogoutMessage("Logout successful");
        toast.success("Logout successful");
      } else {
        const data = await response.json();

        setLogoutMessage(data.message); // Display any error message from the backend.
        toast.error(data.message);
      }
    } catch (error) {
      setLogoutMessage("Error occurred during logout.");
      toast.error("Error occurred during logout.");
    }
    setLoading(false); // Stop loading
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <Navbar style={styles.NavbarStyle} expand="lg" className="bg-body-tertiary">
      <Container  >
        <Navbar.Brand style={{width:"50px",height:"50px"}}  onClick={() => { navigate("/")}} >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv1eThZSlOEJ6n_rv1WmziEZAXGGZjypIx5w&usqp=CAU"  alt="Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate("/") }} >
              <HomeIcon fontSize="large" />
            </Nav.Link>

           {isAuth ? (""): (<Nav.Link style={{margin:"auto"}} onClick={() => { navigate("/signup")}} >
              Create Account
            </Nav.Link>)}

          </Nav>
          {isAuth ? (
            <Nav.Link>
              {" "}
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountCircleIcon fontSize="large" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => {  navigate("/favorites") }}>
                  Favorites
                </MenuItem>

                <MenuItem onClick={() => {handleLogout() }}>
                  {loading ? <CircularProgress size={20} /> : "Logout"}
                </MenuItem>
              </Menu>{" "}
            </Nav.Link>
          ) : (
            <div>
              <Nav.Link onClick={() => { navigate("/login") }} >
                Login
              </Nav.Link>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
const styles = {
  NavbarStyle: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 100, 
  },
};
export default NavbarComponent;
