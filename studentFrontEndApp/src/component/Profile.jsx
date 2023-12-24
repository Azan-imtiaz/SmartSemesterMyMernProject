
import React,{useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {getDataForProfile} from "../Services/apis";

import { ToastContainer, toast } from 'react-toastify';
import Login from '../pages/Login';
import {Base_Url} from "../Services/helper";



function Profile({e}) {
 
  const [profileData,setProfileData]=useState({degree:"",email:"",password:"",fileName:""});
  const [check,setCheck]=useState("");
   
  useEffect(() => {
    

    const fetchData = async () => {
      const keyValue = document.cookie.split('; ').find(cookie => cookie.startsWith('e='));
      let e = keyValue ? keyValue.split('=')[1] : null;

      try {
        const res = await getDataForProfile({value:e});
        console.log(res.data.foundUser)
       
       if(res && res.data.st===200){
        setProfileData(()=>{
          return {degree:res.data.foundUser.degree,password:res.data.foundUser.password,email:res.data.foundUser.email,fileName:res.data.foundUser.fileName,username:res.data.foundUser.username,semester:res.data.foundUser.semester};
        })
        // console.log(profileData)
        
    
        setCheck(false);
       }
       else if(res &&  res.data.st===400){
        setCheck(true);
       
       }
       else{
        setCheck(true);
       
       }
        } catch (error) {
        console.error("Error fetching data:", error);
     setCheck(true);
      }
    };
  
    fetchData();
  },[]);
    return (
<>
      {
       
        check ? (<p style={{color:"blue"}}>Login again</p>) :(<>  
          <Card className="w-100" style={{maxWidth:"60rem", boxShadow: "0 2px 4px blue", margin: "50px auto",textAlign: "center"}}>
      <div style={{ position: "relative", width: "150px", height: "150px", overflow: "hidden", borderRadius: "50%", margin: "0 auto" }}>
        <Card.Img variant="top" src={`${Base_Url}/uploads/${profileData.fileName}`} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
      </div>
      <Card.Body>
        <Card.Title ><p style={{fontWeight:"bold"}}>{profileData.username}</p></Card.Title>
        <Card.Text>
         Student of {profileData.degree}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Semester {profileData.semester}</ListGroup.Item>
        <ListGroup.Item>{profileData.email}</ListGroup.Item>
        
      </ListGroup>
     
    </Card>
          
          </>) 
      }
  < ToastContainer />
  </>   
  );
 
}

export default Profile;
