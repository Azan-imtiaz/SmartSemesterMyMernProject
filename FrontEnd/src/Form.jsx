import React, { useState } from "react";


function Form(){
     const [inp,setInp]=useState({Fname:"",Lname:"",Password:"",File:null});

     
    function handleSubmit(event){
        event.preventDefault()
        let div=document.getElementById("bigListDiv");
       
       let li=document.createElement("li");
       let img=document.createElement("img");
       img.src = URL.createObjectURL(inp.File);
        img.style.width="40px";
        img.style.height="30px";
        img.style.border="2px solid black";
         img.style.borderRadius="5px";
        li.innerText=`${inp.Fname} ${inp.Lname} ${inp.Password}  `;
       div.appendChild(li);
       div.appendChild(img);
       li.style.marginBottom="4px";
       
       console.log(inp);
    }
    function handleInput(e) {
      const { name, value, type } = e.target;
    
      if (type === "file") {
        setInp({ ...inp, [name]: e.target.files[0] });
        console.log(inp);
      } else {
        setInp({ ...inp, [name]: value });
      }
    }
    
    return(
        <>
        
        <h1> Form</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" name="Fname" onChange={handleInput} defaultValue={inp.Fname}   required/>
        <input style={{marginLeft:"30px"}} type="text" placeholder="Last Name" name="Lname" defaultValue={inp.Lname} onChange={handleInput} required/>
        <br />
        <br />

        <input type="password" placeholder="Enter password" name="Password" defaultValue={inp.Password} onChange={handleInput} required/>
        
        <br />
        <br />
        <input type="File"  name="File"  onChange={handleInput} required/>
        
        <br />
        <br />
        <br />
        <button style={{backgroundColor:"blue",padding:"10px",borderRadius:"5px" ,color:"white"}}  >Submit</button>
        <button type="reset" style={{backgroundColor:"blue",padding:"10px",borderRadius:"5px" ,marginLeft:"6px",color:"white"}}  >Reset</button>
        </form>
        <br />
        <br />
        <div >
           <ul id="bigListDiv">

           </ul>
        </div>
        </>
    )
}
export default Form