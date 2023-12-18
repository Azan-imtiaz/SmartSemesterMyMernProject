import axios from "axios";
export async function callAxiosFunction(methods,urls,body,headers){
    let config={
        method:methods,
        url:urls,
        header:headers?headers:{
            "content-Type":"application/json"
        },
        data:body
    }

    return axios(config)
    .then((data)=>{
     return data;
    }).catch(error => {
        // Handle error
        console.error('AxiosError:', error.message);
    });
}