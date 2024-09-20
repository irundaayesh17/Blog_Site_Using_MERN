import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,  faChevronRight, faPlus, faHome, faUser, faSignInAlt, faUserPlus, faCog, faSignOutAlt, faBook, faBookOpen, faBookAtlas, faBookDead, faBookBible} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { useAuthStore } from '../Store/authStore.js';
export default function Header() {

  const [open, setopen] = useState(true)
  const {isAuthenticated} = useAuthStore();
  const Menu = [
    {title: "Create", icon: faPlus, link: '/create', authRequired: false},
    {title: "Home", icon: faHome, link: '/', authRequired: false},
    {title: "Profile", icon: faUser, gap: true, authRequired: true},
    {title: "Login", icon: faSignInAlt, link: '/login', authRequired: false},
    {title: "Register", icon: faUserPlus, link: '/register', authRequired: false},
    {title: "Settings", icon: faCog, authRequired: false},
    {title: "Logout", icon: faSignOutAlt, authRequired: true},
  ];

  return (
    <div className='flex'>
      <div className={`${open ? 'w-72' : 'w-20'} duration-200 h-screen bg-blue-primary fixed`}>
        <FontAwesomeIcon icon={open ? faChevronLeft : faChevronRight} onClick={() => setopen(!open)} className={`w-8 h-8 border-2 border-blue-primary rounded-full absolute right-[-18px] mt-[300px] text-blue-primary bg-white cursor-pointer`}/>
        <div className='flex items-center mt-8 ml-6'>
          <FontAwesomeIcon icon={!open ? faBookOpen : faBookOpen} className='text-white text-2xl font-semibold mt-8 cursor-pointer'/>
          <h1 className={`text-white text-2xl font-semibold mt-8 ml-8 cursor-pointer ${!open && 'scale-0'}`}>Knowledge</h1>
        </div>
        <ul className='pt-6'>
          {Menu.map((menuItem, index) => {
            // Check authentication conditions for showing/hiding items
            if (menuItem.authRequired && !isAuthenticated) return null; // Hide if auth required and not authenticated
            if (!menuItem.authRequired && isAuthenticated && (menuItem.title === "Login" || menuItem.title === "Register")) return null; // Hide login/register if authenticated

            return (
              <li key={index} className={`flex text-white font-semibold items-center pt-8 ml-7 cursor-pointer text-xl min-h-[60px] hover:text-2xl duration-[50ms]`}>
                <Link to={menuItem.link || '#'} className='flex items-center w-full'>
                  <FontAwesomeIcon icon={menuItem.icon} className=' ' />
                  <span className={`ml-7 ${!open && "hidden"} origin-left duration-200`}>{menuItem.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
    </div>
  )
}
