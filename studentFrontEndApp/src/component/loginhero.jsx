import React, { useState, useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import { sendDataFuncApi } from '../Services/apis';
import { addData,addData2 } from './contextProvider';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  {RequestApiForTokenChecking} from "../Services/apis";
import Home from '../pages/Home';
function Loginhero() {
  const [inp, setInp] = useState({ email: '', password: '' });
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const {key,setKey}=useContext(addData);
  const {key2,setKey2}=useContext(addData2);


  function handleChange(e) {
    const { name, value } = e.target;
    setInp((prevInp) => ({ ...prevInp, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendDataFunc();
  }
  async function sendDataFunc() {
    try {
      const res = await sendDataFuncApi(inp);

     
      if (res && res.status === 200) {
        console.log(res.data);
        Cookies.set('key',res.data, { expires: 7 });   //7 day expire
        setKey(inp.email);
        navigate('/home');
     
      } else {
        toast.error("Enter Valid Credentials");
      }
  
     
    } catch (error) {
      toast.error('Error while processing the request');
    
    }
  }
  useEffect(() => {
    const keyValue = document.cookie.split('; ').find(cookie => cookie.startsWith('key='));
    const value = keyValue ? keyValue.split('=')[1] : null;
    sendCallApi(value);
  }, []);
  
      async function sendCallApi(value){
       const res=await RequestApiForTokenChecking({"id":value});        
       if(res && res.status===200){
           setKey2(true);
          } 
          else{
            setKey2(false);
          }
    
      }


    return (
      key2 ? (
        <Home />
      ) : (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <Row>
            <Col xs={12} md={12} lg={12} xl={12} className="mx-auto">
              <Form style={{ backgroundColor: '#3498db', padding: '20px', borderRadius: '8px' }}>
                <div className="text-center mb-3">
                  <h3>Login Please</h3>
                </div>
    
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} defaultValue={inp.email} />
                  <Form.Text className="text-muted" style={{ color: 'white' }}>
                    We'll never share your email with anyone else
                  </Form.Text>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} defaultValue={inp.password} />
                </Form.Group>
    
                <Button variant="light" type="submit" onClick={handleSubmit}>
                  Login
                </Button>{' '}
                <Button variant="light" type="submit">
                  <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                    Register
                  </Link>
                </Button>
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      )
    );
    
}

export default Loginhero;
