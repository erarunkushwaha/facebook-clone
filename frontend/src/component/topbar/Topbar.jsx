import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../context/AuthContext";

const Topbar = () => {
  const {user,isFecthing,error,dispatch} = useContext(Authcontext)

  const logout = async () => {
     dispatch({ type: "LOGIN_SUCCESS", playload:null });
  }
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to="/" style={{textDecoration:"none"}}>
        <span className='logo'>AKSITE</span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <SearchIcon className="searchIcon" />
          <input
            type='text'
            placeholder='Search posts friends'
            className='searchInput'
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <span className='topbarLink'>Homepage</span>
          <span className='topbarLink'>Timeline</span>
        </div>
        <div className='topbarIcons'>
          <div className='topBarIconItem'>
            <PersonIcon />
            <span className='topBarIconBadge'>1</span>
          </div>
          <div className='topBarIconItem'>
            <ChatIcon />
            <span className='topBarIconBadge'>2</span>
          </div>
          <div className='topBarIconItem'>
            <NotificationsIcon />
            <span className='topBarIconBadge'>1</span>
          </div>
        </div>
        <img onClick={()=> logout()} src="/assets/person/1.jpeg" alt="" className="topBarImage" />
      </div>
     
    </div>
  );
};

export default Topbar;
