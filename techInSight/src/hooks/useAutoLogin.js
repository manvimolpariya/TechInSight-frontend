import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {setUser} from "../store/userSlice"
import axios from "axios";
function useAutoLogin(){
    const [loading, setLoading]=useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        (async function autoLoginApiCall(){

            try {
                const response = await axios.get(`http://localhost:5000/refresh`, {
                    withCredentials : true,
                });
                if(response.status === 200){
                    //setUser
                    const user ={
                     _id : response.data.user._id,
                     email : response.data.user.email,
                     username : response.data.user.username,
                     auth : response.data.auth
                    }
                   
                    dispatch(setUser(user));
                }
                
            } catch (error) {
                return error;
            }
           finally{
            setLoading(false);
           }
          
        })()
    },[dispatch]);
    return loading;
}
export default useAutoLogin;