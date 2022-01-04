import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Authcontext } from "../../context/AuthContext";
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({ user }) {

const [friends, setFriends] = useState([])
const { user:currentUser, dispatch } = useContext(Authcontext);

const [followed, setFollowed] = useState(
  currentUser.followings.includes(user?._id)
);

useEffect(() => {
  const getFriends = async () => {
    try {
      const friendList = await axios.get("http://localhost:8800/api/users/getMyfriends/" + user._id);
      setFriends(friendList.data);
      
    } catch (err) {
      console.log(err);
    }
  };
  getFriends();
}, [user]);


  const followHandler = async () => {
    try {
      if(followed){
        await axios.put("http://localhost:8800/api/users/"+ user._id +"/unfollow",{userId: currentUser._id});
        dispatch({type:"UNFOLLOW", playload:user._id})
      } else {
        await axios.put("http://localhost:8800/api/users/"+ user._id +"/follow",{userId: currentUser._id});
        dispatch({type:"FOLLOW", playload:user._id})

      }
      
    } catch (error) {
      console.log(error);
    }
    
      setFollowed(!followed)
      console.log(followed)
  }

  const HomeRightbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF+"gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF+"ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
    {user.username !== currentUser.username &&  ( <Button variant="contained" size="small"  onClick={followHandler} endIcon={ followed ?<RemoveIcon/>  : <AddIcon  /> }>
      {followed ? "Unfollow" : "follow"}

</Button>)}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user._id}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : user.relationship === 3 ? "Complicated" : '-'}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">

        {friends.map((friend) =>  (
          <Link key={friend._id} to={'/profile/'+friend.username} className={"rightbarFollowingLink"} >
          <div className="rightbarFollowing">
          <img
            src={friend.profilePicture ? PF+`person/${friend.profilePicture}` : `${PF}person/noAvatar.png` }
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">{friend.username}</span>
        </div>
        </Link>
        ))}

        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
