import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,  faChevronRight, faPlus, faHome, faUser, faSignInAlt, faUserPlus, faCog, faSignOutAlt, faBook, faBookOpen, faBookAtlas, faBookDead, faBookBible} from '@fortawesome/free-solid-svg-icons'

export default function Header() {

  const [open, setopen] = useState(true)
  const Menu = [
    {title: "Create", icon: faPlus},
    {title: "Home", icon: faHome},
    {title: "Profile", icon: faUser, gap: true},
    {title: "Login", icon: faSignInAlt},
    {title: "Register", icon: faUserPlus},
    {title: "Settings", icon: faCog},
    {title: "Logout", icon: faSignOutAlt},
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
          {Menu.map((menu, index) => (
            <li key={index} className={`flex text-white font-semibold items-center pt-8 ml-7 cursor-pointer text-xl min-h-[60px] hover:text-2xl duration-[50ms]`}>
              <FontAwesomeIcon icon={menu.icon} className=' '/>
              <h1 className={` ml-7 ${!open && "hidden"} origin-left duration-200`}>{menu.title}</h1>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  )
}
