import { callAxiosFunction } from "./apisAxios";
import { Base_Url } from "./helper";




export async function  postRequestFromRegisterPage(body,config){
       return await  callAxiosFunction('POST', `${Base_Url}/sendData`,body,config);
    
}



export async function  sendDataFuncApi(body){
       return await  callAxiosFunction('POST', `${Base_Url}/login`,body);
    
}
