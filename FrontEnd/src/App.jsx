

import Navbar from './navbar'
import BODY from './BODY.JSX'
import {Home} from "./Home";
import {About} from "./About";
import {Error} from "./error";
import  Form  from './Form';
import {Route,Routes} from "react-router-dom";
import './App.css'

function App() {
  let obj={
    color:'green'
  }
  
  return (
    <>
    <Navbar />
   <BODY />
   <Routes>
    <Route exact path='/' element={<Home value="Home" />} />
    <Route path='/about' Component={About} /> 
    <Route path='/form' Component={Form} /> 
    <Route path='*' Component={Error} />

   </Routes>


      </>
  )
}

export default App
