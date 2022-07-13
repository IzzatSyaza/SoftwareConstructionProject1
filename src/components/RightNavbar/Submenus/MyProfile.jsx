//REACT ROUTER
import { Link, useNavigate } from "react-router-dom";

//HOOKS
import useClickOutside from "../../../CustomHooks/ClickOutside";
import { useState } from "react";

//ICONS , PICS , STYLES
import styles from "./MyProfile.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ReactComponent as Avatar } from "../../../pics/avatar.svg";
import { useAuth } from "../../../Context/Auth";


const MyProfile = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const [isProfileOpen, setisProfileOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setisProfileOpen(false);
  });

  const handleLogout =() => {
    auth.logout();
    navigate('/login');
  }
  return (
    <div
      ref={domNode}
      className={styles.avatar_container}
      onClick={() => {
        setisProfileOpen(!isProfileOpen);
      }}
    >
      {/* AVATAR ICON */}
      {/* <div className={styles.icon_avatar_container}>
        <Avatar />
      </div> */}

      {/* NAME */}
      <div className={styles.name}>
        <span>{auth.user.username}</span>
        <MdKeyboardArrowDown />
      </div>

      {/* AVATAR/SETTINGS SUBMENU */}
      <div
        className={`${styles.menu} ${isProfileOpen ? styles.menu_active : ""}`}
      >
        <div className={styles.info}>
          <span className={styles.name}>{auth.user.username}</span>
          {/* <span className={styles.role}>Adminstrator</span> */}
        </div>
        <div className={styles.settings}>
          {/* <Link to="/">Settings</Link> */}
          <Link to="/profile">Profile</Link>
        </div>
        <div className={styles.settings}>
          {/* <Link to="/">Settings</Link> */}
          <span onClick={handleLogout}>LogOut</span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
