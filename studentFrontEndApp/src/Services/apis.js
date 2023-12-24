import { callAxiosFunction } from "./apisAxios";
import { Base_Url } from "./helper";




export async function  postRequestFromRegisterPage(body,config){
       return await  callAxiosFunction('POST', `${Base_Url}/sendData`,body,config);
    
}



export async function  sendDataFuncApi(body){
       return await  callAxiosFunction('POST', `${Base_Url}/login`,body);
    
}



export async function  RequestApiForTokenChecking(body){
       return await  callAxiosFunction('POST', `${Base_Url}/token`,body);
    
}


export async function  getDataForProfile(body){

       return await  callAxiosFunction('POST', `${Base_Url}/getProfileData`,body);
    
}


export async function  updateRequestFromUpdatePage(body,config,id){
       console.log(id)
       return await  callAxiosFunction('POST', `${Base_Url}/updateData?id=${id}`,body,config);
    
}


