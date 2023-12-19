import React,{useContext,useEffect } from "react";
import Loginhero from "../component/loginhero";
import { useNavigate } from "react-router-dom";

import  {RequestApiForTokenChecking} from "../Services/apis";


export default function Login(){

 
    return(<>
           <Loginhero />
    </>)
}