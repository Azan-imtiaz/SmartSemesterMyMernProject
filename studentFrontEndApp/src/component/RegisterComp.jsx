import React, { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import { postRequestFromRegisterPage } from '../Services/apis';
import Home from '../pages/Home';
import { RequestApiForTokenChecking } from "../Services/apis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addData, addData2 } from './contextProvider';



function RegisterComp() {
  const [inp, setInp] = useState({ email: "", password: "", degree: "", file: null ,semester:"",});
  const [imagePreview, setImagePreview] = useState('');
  const [check,setCheck]=useState("");
  
const { key, setKey } = useContext(addData);
const { key2, setKey2 } = useContext(addData2);
   
  function handleChange(e) {
    const { name, value, type } = e.target;
    if (type === "file") {
      const selectedFile = e.target.files[0];
      setInp((prevInp) => ({ ...prevInp, [name]: selectedFile }));

      // Update image preview
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
      
    }
    else {
      setInp(() => { return { ...inp, [name]: value } });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(inp);
    if (AllinputFiled()) {
      const data = new FormData();
     
      data.append("email", inp.email);
      data.append("username", inp.username);
      data.append("semester", inp.semester);
      data.append("degree", inp.degree);
      data.append("password", inp.password);
      data.append("file", inp.file); // Use the same name as expected by the server
  
      sendDataFromRegisterPage(data);
    } else {
      toast.error("Please fill out all required fields.");
    }
  }
  
  function AllinputFiled() {
    if (inp.email != "" && inp.password != "" && inp.degree != "" && inp.file != null) {
      return true;
    }
    else {
      return false;
    }
  }
  async function sendDataFromRegisterPage(data) {
    const config = {
      "Content-Type": "multipart/form-data",
    };
    try{

      const res = await postRequestFromRegisterPage(data, config);
      
      if (res && res.data.st === 200) {
        
        toast.success("Registered successfully - Now Login");
      }
      else if( res && res.data.st===500){
        toast.error("Sorry Server is down.Try Later");
        
      }
      else if(res && res.data.st===300) {
        toast.error("Email already Exists");
      }
      else{
        toast.error("Server is down-Try Later")
      }
    }
    catch(error){
      toast.error("Server is down-Try Later")
    }
  }
  
  useEffect(() => {
    const keyValue = document.cookie.split('; ').find(cookie => cookie.startsWith('key='));
    const value = keyValue ? keyValue.split('=')[1] : null;
    sendCallApi(value);
  }, []);

  async function sendCallApi(value) {
    const res = await RequestApiForTokenChecking({ "id": value });
    if (res && res.status === 200) {
       setCheck(false);
       setKey(res.data.email);
       setKey2(true);
    }
    else {
     setCheck(true);
     setKey2(false);
    }
   console.log(check)
  } 


  return (
    check ?(
      <>
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row>
        <Col xs={12} md={8} lg={12} xl={12} className="mx-auto">
          <Form style={{ backgroundColor: '#3498db', padding: '20px', borderRadius: '8px' }}>
            <div className="text-center mb-3">
              {imagePreview ? (<Image style={{ height: "30px", width: "25px" }} src={imagePreview} alt="profile" fluid />) : (<Image style={{ height: "30px", width: "25px" }} src="./MyImage.jpg" alt="profile" fluid />)}

            </div>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }} >Enter Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" name="username" onChange={handleChange} defaultValue={inp.username} required />
            </Form.Group>



            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'white' }} >Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} defaultValue={inp.email} required />
              <Form.Text className="text-muted" style={{ color: 'white' }}>
                All the entered info will be added to your peofile
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }} >Enter Degree</Form.Label>
              <Form.Control type="text" placeholder="Enter Degree" name="degree" onChange={handleChange} defaultValue={inp.degree} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }} >Enter Semester</Form.Label>
              <Form.Control type="text" placeholder="Enter Semester" name="semester" onChange={handleChange} defaultValue={inp.semester} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }} >Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} defaultValue={inp.password} placeholder="Password" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" >
              <Form.Label style={{ color: 'white' }} >Add profile image</Form.Label>
              <Form.Control type="file" onChange={handleChange} name='file' required />
            </Form.Group>


            <Button variant="light" type="submit" onClick={handleSubmit}>
              Submit
            </Button>{"   "}
            <Button variant="light" type="submit">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>Login</Link>

            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>  
      </>
    )
    :(<Home />)
  );
}

export default RegisterComp;
