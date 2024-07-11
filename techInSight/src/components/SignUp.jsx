import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import TextInput from "./TextInput"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../api/internal.js";
import signupSchema from "../schemas/signupSchema";
import { setUser } from "../store/userSlice";


const SignUp = () => {
  const [error, setError] =useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async () =>{
   try {
     const data ={
       name : values.name,
       username : values.username,
       email : values.email,
       password : values.password,
       confirmPassword : values.confirmPassword
     }
   //  console.log(data)
     const response = await signup(data);
      if(response.status === 201){
          //setUser
          const user ={
           _id :response.data.user._id,
           email : response.data.user.email,
           username : response.data.user.username,
           auth : response.data.auth,
          }
         
          dispatch(setUser(user))
          // redirect -> homepage
         navigate('/');
      }
      else if (response.code === 'ERR_BAD_REQUEST'){
         setError(response.response.data.message);
      }
   } catch (error) {
      console.log(error);
   }
  }
  const {values, touched, handleBlur, handleChange, errors} =useFormik({

    initialValues :{
      name : '',
      username : '',
      email : '',
      password : '',
      confirmPassword :''
    },
    validationSchema : signupSchema ,
  })

  return (
    <div className="mx-auto max-w-[90%] px-2 flexCenter flex-col pt-48 overflow-hidden">
     <h2 className="bold-32 text-center mb-10 min-w-[355px]">SignUp your account</h2>
      <TextInput 
        type='text'
        name='name'
        placeholder='name'
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />
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
        type='text'
        name='email'
        placeholder='email'
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
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
      <TextInput
       type='password'
       name='confirmPassword'
       placeholder='confirmPassword'
       value={values.confirmPassword}
       onBlur={handleBlur}
       onChange={handleChange}
       error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
       errormessage={errors.confirmPassword}
      />
      <button className="btn_dark_rounded mt-7 min-w-[299px] disabled:bg-[#333]" onClick={handleSignup} disabled={!values.username || !values.name || !values.password ||!values.email || !values.confirmPassword || errors.username || errors.name || errors.email || errors.password|| errors.confirmPassword}>Sign Up</button>
      <span className="mt-12 text-gray-30 ">Already have an account?<button className="ml-1 text-black underline" onClick={() => navigate('/login') }>Login</button></span>
   {error !==  "" ? <p className="text-red-500 my-5 mx-0">{error}</p>  : ""}
    </div>
  )
}

export default SignUp ;
