import React, { useState } from 'react';

//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext } from "react";
import NavContext from "../../Context/NavContext";

//REACT ROUTER
import { NavLink } from "react-router-dom";

// const SidebarLabel = styled.span`
//   margin-left: 16px;
// `;

// const DropdownLink = styled(Link)`
//   background-color: rgb(243, 243, 255);
//   padding: 0.8rem 0 0.8rem 2rem;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   color: #000;
//   border-radius: 8px;


//   &:hover {
//     background-color: rgb(225, 225, 255);
//     cursor: pointer;
//   }
// `;

const NavUrl = ({ url, icon, description }) => {
    const { nav, setNav } = useContext(NavContext);
    const checkWindowSize = () => {
      if (window.innerWidth < 1024) setNav(!nav);
    };
  
    return (
      <li className={styles.li_navlink}>
        <NavLink
          to={`${url}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          onClick={() => checkWindowSize()}
        >
          {icon}
          <span className={styles.description}>{description}</span>
        </NavLink>
      </li>
    );
  };

const SubMenu = ({ item }) => {
//   const [subnav, setSubnav] = useState(false);

//   const showSubnav = () => setSubnav(!subnav);

return (
    <>
    {/* {item.subNav ?
        <li className="sidebarListItem" onClick={item.subNav && showSubnav}>
            <div className="sidebarIcon">
                {item.icon}
            </div>
            {item.title}
            <div className="iconArrow">
                {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
            </div>
        </li> : 
    <Link to={item.path} className="link">
        <li className="sidebarListItem" onClick={item.subNav && showSubnav}>
            <div className="sidebarIcon">
                {item.icon}
            </div>
            {item.title}
            <div className="iconArrow">
                {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
            </div>
        </li>
    </Link>} */}
    
        {/* {subnav &&
            item.subNav.map((item, index) => {
            return (
            <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
        );
        })} */}
        <NavUrl
            url={item.path}
            icon={item.icon}
            description={item.title}
          />
    </>
);
};

export default SubMenu;
