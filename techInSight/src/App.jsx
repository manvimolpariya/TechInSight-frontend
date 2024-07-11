import { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './components/Home'
import Crypto from './components/Crypto'
import Blog from './components/Blog'
import SubmitBlog from './components/SubmitBlog'
import Protected from './components/Protected'
import  SignUp from './components/SignUp'
import  LogIn from './components/Login'
import  LogOut from './components/LogOut'
import Error from './components/Error'
import { useSelector } from 'react-redux'
import BlogDetails from './components/BlogDetails'
import BlogUpdate from './components/BlogUpdate'

function App() {
  const [count, setCount] = useState(0)
 const isAuth = useSelector((state) => state.user.auth);
  return (
    <>
    <BrowserRouter>
    <main className='bg-white text-primary'>
     <Header/>
     <Routes>
      <Route path='/' extract element={<Home/>}/>
      <Route path='crypto' element={<Crypto/>}/>
      <Route path='blog' element={<Protected isAuth={isAuth}><Blog/></Protected>}/>
      <Route path='blog/:id' element={<Protected isAuth={isAuth}><BlogDetails/></Protected>}/>
      <Route path='blog-update/:id' element={<Protected isAuth={isAuth}><BlogUpdate/></Protected>}/>
      <Route path='submit' element={<Protected isAuth={isAuth}><SubmitBlog/></Protected>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='login' element={<LogIn/>}/>
      <Route path='logout' element={<LogOut/>}/>
      <Route path='*' element={<Error/>}/>
     </Routes>
     <Footer/>
     </main>
    </BrowserRouter>
   </>
  );
}

export default App
