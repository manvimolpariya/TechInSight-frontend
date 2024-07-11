
import { Link, NavLink } from 'react-router-dom'
import '../index.css'
import user from '../../public/user.svg'
import Navbar from './Navbar'
import { useState } from 'react';
import {CgClose, CgMenuRight} from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../api/internal';
import { resetUser } from '../store/userSlice';
import logo  from '../../public/logo.svg'
function Header() {
  const dispatch = useDispatch() ;
  const isAuthenticated = useSelector((state) => state.user.auth);
  const [menuOpened, setMenuOpend] =useState(false);
  const toggleManu = () => setMenuOpend(!menuOpened);
  const handleLogout = async () =>{
    await signout();
    dispatch(resetUser());
  }
  return (
    <div className='fixed w-full top-2  left-0 m-auto'>
        <div className='max-container px-4 flexBetween py-3 shadow-lg bg-white rounded-full ring-1 ring-slate-900/5 mb-24 max-xs:py-2'>
          <div>
            <Link to='/'><img src={logo} alt="" /></Link>
          </div>
          <Navbar containerStyles={`${menuOpened ? "flexCenter flex-col gap-y-8 justify-center fixed top-24 right-0 p-12 bg-white rounded-3xl transition-all duration-500 shadow-md  w-full medium-16" : "hidden md:flex gap-x-6 text-gray-30 xl:gap-x-20 medium-16"}`}/>
          <div className='flexBetween gap-2 bold-16'>
           {!menuOpened ?(
           <CgMenuRight className="md:hidden inline-block cursor-pointer regular-24 hover:text-secondary mr-2" onClick={toggleManu}/>
           ) : ( <CgClose className="md:hidden inline-block cursor-pointer regular-24 hover:text-secondary mr-2" onClick={toggleManu}/>)}
         {isAuthenticated ?  
         <div className='flexBetween gap-x-2'><NavLink to={'/login'} className={"btn_secondary_rounded !py-2"} onClick={handleLogout}>Log Out</NavLink></div> 
         :  <div className='flexBetween gap-x-1'><NavLink to={'/login'} className={'btn_white_rounded flexCenter gap-x-1 w-28 !py-2'}><img src={user} alt='userIcon' height={19} width={19}/>log In</NavLink>
                 <NavLink to={'/signup'} className={"btn_secondary_rounded !py-2"}>sign Up</NavLink>
            </div>
         }
          </div>
        </div>
    </div>
  )
}

export default Header
