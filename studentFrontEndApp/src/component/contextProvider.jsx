import React, {  createContext,useState }  from "react";

export const  addData=createContext();
export const  addData2=createContext();
// function ContextProvider({ children }){
//        const [key,setKey]=useState("");
//        const [key2,setKey2]=useState("");
       
// 
//        return(<>
//        <addData.Provider value={{key,setKey}}>
//        <addData2.Provider value={{key2,setKey2}}>
//        {children}
//        </addData2.Provider>
//        </addData.Provider>
       
//        </>)

// }
// export default ContextProvider;