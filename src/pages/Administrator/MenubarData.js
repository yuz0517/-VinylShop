import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";
import * as FaIcons from "react-icons/fa";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

const cName='admin-nav-text';
export const MenubarData=[
    {
        title: 'Home',
        path: '/admin',
        icon:<AiIcons.AiFillHome />,
        cName: "admin-nav-text",
    },
    {
        title:'Users',
        path: '/admin/user',
        icon:<AiIcons.AiOutlineTeam />,
        cName: "admin-nav-text",
    },
    {
        title:'Subscribe Users',
        path: '/admin/subscribe',
        icon:<HiOutlinePaperAirplane/>,
        cName: "admin-nav-text",
    },


    
]
