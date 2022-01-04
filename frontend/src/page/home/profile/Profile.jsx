import  axios  from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Feed from "../../../component/feed/Feed";
import Rightbar from "../../../component/rightsidebar/Rightbar";
import Sidebar from "../../../component/sidebar/Sidebar";
import Topbar from "../../../component/topbar/Topbar";
import "./profile.css";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const {username} = useParams();
  
  const [user, setUser] = useState([]);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?username=${username}`
      );
     
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
            <div className="profileRightTop">
                <div className="profileCover">
                <img src={user.coverPicture ? PF+`person/${user.coverPicture}` : `${PF}person/noAvatar.png` } alt="" className="profileUserImg" />
                <img src={user.profilePicture ? PF+`person/${user.profilePicture}` : `${PF}person/noAvatar.png` } alt="" className="profileCoverImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                </div>
            </div>
            <div className="profileRightBottom">
            <Feed username={username} />
          <Rightbar user={user}  />
            </div>
         
        </div>
      </div>
    </>
  );
};

export default Profile;
