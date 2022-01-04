import './online.css';

const Online = ({user}) => {
    return (
        <li className="rightbarFriend">
                       <div className="rightBarProfileImgContainer">
                       <img src={user.profilePicture} alt="" className="rightbarProfileImg" />
                       <span className="rightbarOnline"></span>
                       </div>
                       <span className="rightBarUsername">{user.username}</span>
                    </li>
    )
}

export default Online
