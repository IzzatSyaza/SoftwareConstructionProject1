//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext } from "react";
import NavContext from "../../Context/NavContext";

//REACT ROUTER
import { NavLink } from "react-router-dom";

//ICONS
import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdOutlinedFlag,
  MdPeopleOutline,
  MdOutlineMessage,
  MdOutlineLogout,
} from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { FaReact, FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";
import { SidebarDataAdmin, SidebarDataJury, SidebarDataSchool} from './NavbarData';
import SubMenu from './Submenu';



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

const Navbar = ({type}) => {
  const { nav, setNav } = useContext(NavContext);

  const sideItem = (type) => {
    if(type === "ADMIN"){
                return (
            <ul className="sidebarList">
                {SidebarDataAdmin.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                })}
            </ul>
            )
            }
            else if(type === "JURY"){
                return(
            <ul className="sidebarList">
                {SidebarDataJury.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                })}
            </ul>
                )
            }
            else if(type === "SCHOOL"){
              return(
          <ul className="sidebarList">
              {SidebarDataSchool.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
              })}
          </ul>
              )
          }
            else {
                return (
                    <ul>
                    </ul>
                )
            }
}

  return (
    <div
      className={`${styles.navbar_container} ${
        nav ? styles.navbar_mobile_active : undefined
      }`}
    >
      <nav className={nav ? undefined : styles.nav_small}>
        {/* LOGO */}
        <div className={styles.logo}>
          <VscDashboard className={styles.logo_icon} />
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>

        {/* MENU */}
        <ul className={styles.menu_container}>
          {/* FIRST CATEGORY */}
          <span className={styles.categories}>
            {nav ? "Pages" : <BsThreeDots />}
          </span>
          {sideItem(type)}
     
        </ul>

        {/* LOGOUT BUTTON */}
        <div
          className={`${styles.btn_logout}`}
          onClick={() => {
            setNav(!nav);
          }}
        >
          <MdOutlineLogout />
        </div>
      </nav>

      <div
        className={nav ? styles.mobile_nav_background_active : undefined}
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </div>
  );
};

export default Navbar;
