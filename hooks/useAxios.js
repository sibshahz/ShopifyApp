import Axios from 'axios';
import {useAppBridge} from '@shopify/app-bridge-react';
import {getSessionToken} from "@shopify/app-bridge-utils";

export function useAxios(){
    const app=useAppBridge();
    const instance=Axios.create();
    instance.interceptors.request.use(function(config){
        return getSessionToken(app).then((token)=>{
            config.headers["Authorization"] = `Bearer ${token}`;
            config.headers["CrossOrigin"]=true;
            return config;
        });
    });
    return [instance];
}


 //stack overflow solution for CORS error
//  server.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });