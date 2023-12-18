import React from "react";
import {Link} from "react-router-dom";

let a = 42; // Assuming 'a' is a variable you want to export

function Navbar() {
  return (
    <>
      <Link style={{margin:"40px",fontSize:"20px",textDecoration:"none",color:"blue"}} to="/" >Home</Link>
      <Link style={{margin:"100px",fontSize:"20px",textDecoration:"none",color:"blue"}}  to="/about" >About</Link>
      <Link style={{margin:"100px",fontSize:"20px",textDecoration:"none",color:"blue"}}  to="/form" >Form</Link>

    
     
         </>
  );
}

export  default Navbar;
