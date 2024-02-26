import React from "react";
import { Link } from "react-router-dom";
import { MenubarData } from "./MenubarData";
import "./Menubar.css"
function Menubar() {
  return (
    <div className="admin-menu-container">
      <div>
        {MenubarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default Menubar;
