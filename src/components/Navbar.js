import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as ioIcons from "react-icons/io";

import { signOut } from 'firebase/auth';
import { auth } from "../firebase";//파베
import {Context} from "./ContextProvider";


//const { isLoggedIn, setIsloggedIn } = UserContextProvider();
function Navbar() {
    
    const [sidebar, setSidebar] = useState(false) //false=notshowing
    
    const { isLoggedIn, setIsloggedIn } = useContext(Context);
    const showSidebar = () => setSidebar(!sidebar)
    /*const [User, setUser] = useState({
        email: sessionStorage.key(0) //login, logout 아이콘 띄워주기 전에 먼저 로그인 여부 판별
    });*/
    
    const isloginkey = sessionStorage.key(0) ;
    useEffect(() => {
        
    if (isloginkey === null) {
        //reftest(true);
        test=0;
        setIsloggedIn(false);
        console.log("Navbar.js: setIsloggedoutalse");
        
    
      }else {
        setIsloggedIn(true);
        console.log("state:",isLoggedIn)
        test=1;
        console.log("Navbar.js: setIsloggedin true")
      }
    },)
    
    const logout = async () => {
        await signOut(auth);
        sessionStorage.clear();
        setIsloggedIn(false);
    }
    



    return (
        <>
            
            <IconContext.Provider value={{ color: '#fff' }}>

                <div className='navbar'>
                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    {/*<Loginform />*/}
                    {/*<ioIcons.IoIosLogOut/>*/}
                    {isLoggedIn ? (
                        
                            <ioIcons.IoIosLogOut onClick={logout}/>
                        
                    ) : (
                        <Link to="/Signin">
                            <ioIcons.IoIosLogIn/>
                        </Link>

                    )}
                    


                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                                
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}

                    </ul>
                </nav>

            </IconContext.Provider>
        </>
    )
}
let test=0;
export function signinupdate() {
    //setIsloggedIn(true);
    console.log("test",test)
    //setReftest(true);
    //console.log("signinupdate");
}


export default Navbar