import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";
import * as FaIcons from "react-icons/fa";
export const SidebarData=[
    {
        title: 'Home',
        path: '/',
        icon:<AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title:'Sign in',
        path: '/signin',
        icon:<AiIcons.AiOutlineLogin />,
        cName: 'nav-text',
    },
    {
        title: 'MY PAGE',
        path: '/mypage',
        icon:<VscIcons.VscAccount />,
        cName: 'nav-text'
    },
    {
        title: 'Board',
        path: '/board',
        icon:<BsIcons.BsPencilSquare/>,
        cName: 'nav-text'
    },
    {
        title: 'VINYL',
        path: '/vinyl',
        icon:<FaIcons.FaRecordVinyl />,
        cName: 'nav-text'
    },
    
]
