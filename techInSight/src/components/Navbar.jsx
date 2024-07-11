import { NavLink } from "react-router-dom"


const Navbar = ({containerStyles}) => {
  return (
   <nav className={`${containerStyles}`}>
    <NavLink to={'/'} className={({isActive})=> isActive ? 'active_link': ''}>Home</NavLink>
    <NavLink to={'crypto'} className={({isActive})=> isActive ? 'active_link':""}>Crypto</NavLink>
    <NavLink to={'blog'} className={({isActive})=> isActive ? 'active_link': ''}>Blog</NavLink>
    <NavLink to={'submit'} className={({isActive})=> isActive ? 'active_link': ''}>Submit</NavLink>
   </nav>
  )
}

export default Navbar
