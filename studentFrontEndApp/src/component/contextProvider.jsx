import React, {  createContext,useState }  from "react";

export const  addData=createContext();
function ContextProvider({ children }){
       const [key,setKey]=useState("");


       return(<>
       <addData.Provider value={{key,setKey}}>
       {children}
       </addData.Provider>
       
       </>)

}
export default ContextProvider;