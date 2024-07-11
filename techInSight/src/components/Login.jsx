import { useNavigate } from "react-router-dom"
import TextInput from "./TextInput"
import {useFormik} from 'formik'
import loginSchema from "../schemas/loginSchema";
import {login} from '../api/internal.js'
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useState } from "react";


const Login = () => {
  const [error, setError] =useState("");
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const handleLogin = async () =>{
    const data ={
      username : values.username,
      password : values.password
    }
    const response = await login(data);
     if(response.status === 200){
         //setUser
         const user ={
          _id :response.data.user._id,
          email : response.data.user.email,
          username : response.data.user.username,
          auth : response.data.auth
         }
         dispatch(setUser(user));
         // redirect -> homepage
         navigate('/');
     }
     else if (response.code === 'ERR_BAD_REQUEST'){
        setError(response.response.data.message);
     }
  }
  const {values, touched, handleBlur, handleChange, errors} = useFormik({
  
    initialValues :{
      username : '',
      password : '',
    },
    validationSchema:loginSchema
  })
  return (
    <div className="mx-auto max-w-[90%] px-2 flexCenter flex-col pt-48 overflow-hidden">
      <h2 className="bold-32 text-center mb-10 min-w-[355px]">Login your account</h2>
      <TextInput 
        type='text'
        name='username'
        placeholder='username'
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextInput
       type='password'
       name='password'
       placeholder='password'
       value={values.password}
       onBlur={handleBlur}
       onChange={handleChange}
       error={errors.password && touched.password ? 1 : undefined}
       errormessage={errors.password}
      />
      <button className="btn_dark_rounded mt-7 min-w-[299px] disabled:bg-[#333]" onClick={handleLogin} disabled={!values.username || !values.password || errors.password || errors.username}>Log In</button>
      <span className="mt-12 text-gray-30 ">Don't have an account?<button className="ml-1 text-black underline" onClick={() => navigate('/signup')}>Register</button></span>
   {error !==  "" ? <p className="text-red-500 my-5 mx-0">{error}</p>  : ""}
    </div>
  )
}

export default Login
