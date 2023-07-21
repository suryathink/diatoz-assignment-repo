import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Favorites from './Components/Favorites';
import { ToastContainer } from "react-toastify";
import { useState } from 'react';
import Dialog from './Components/Dialog';
import PrivateComp from './Components/Context/Privateroute';

function App() {
  let [isAuth, setIsAuth ] = useState(false); 

  return (
    <div className="App">
        <ToastContainer/>
    
     <NavbarComponent/>
     <Routes>
     <Route path = "/" element = {<PrivateComp ><Home/></PrivateComp>} />
     <Route path = "/signup" element = {<Signup/>} />
     <Route path = "/login" element = {<Login/>} />
     <Route path = "/favorites" element = {<PrivateComp><Favorites/></PrivateComp>} />
     <Route path = "*" element = {<Signup/>} />
     </Routes>
    </div>
  );
}

export default App;
