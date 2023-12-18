import React from 'react';
import Home from './pages/Home';
import AddCourse from './pages/AddCourse';
import Naavbar from './component/navbar';
import Footer from './component/footer';
import {Link,Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/register';
import Result from "./pages/Result";
import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from "./pages/UpdateProfileMain"

function App() {
  return (
    <>
    
     <Routes>

<Route exact path='/home' element={<Home />}></Route>
<Route  exact path='/' element={<Login />}></Route>
<Route exact path='/register' element={<Register />}></Route>
<Route exact path='/result' element={<Result />}></Route>
<Route exact path='/AddCourse' element={<AddCourse />}></Route>
<Route exact path='/ProfilePage' element={<ProfilePage />}></Route>
<Route exact path='/UpdateProfile' element={<UpdateProfilePage/>}></Route>

     </Routes>
    </>
  );
}

export default App;
