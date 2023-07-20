import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Favorites from './Components/Favorites';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
        <ToastContainer/>
     <Navbar/>
     <Routes>
     <Route path = "/" element = {<Home/>} />
     <Route path = "/signup" element = {<Signup/>} />
     <Route path = "/login" element = {<Login/>} />
     <Route path = "/favorites" element = {<Favorites/>} />
     <Route path = "*" element = {<Home/>} />
     </Routes>
    </div>
  );
}

export default App;
