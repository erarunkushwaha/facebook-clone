import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from 'timeago.js';
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/AuthContext";
const Post = ({post}) => {
  const { user: currentUser } = useContext(Authcontext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);


  const likeHandelar= async () => {

    try {
      axios.put("http://localhost:8800/api/posts/" + post._id + "/like", { userId: currentUser._id });
      // axios.put("http://localhost:8800/api/posts/" + post._id + "/like");
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  return (
    <div className='post'>
     <div className="postWrapper">
     <div className='postTop'>
        <div className='postTopLeft'>
          <Link to={`profile/${user.username}`}>
          <img src={ `${PF}person/${user.profilePicture}` ||  PF+"person/noAvatar.png"} alt='' className='postProfileImg' />
          </Link>
        <span className='postUsername'> {user.username}</span>
          <span className='postDate'> {format(post.createdAt)}</span>
        </div>
        <div className='postTopRight'>
          <MoreVertIcon />
        </div>
      </div>

      <div className='postCenter'>
        <span className='postText'>{post?.desc}</span>
        <img src={`${PF}/${post.img}`} alt='' className='postImg' />
      </div>
      <div className='postBottom'>
        <div className='postBottomLeft'>
          <img src='/assets/like.png' alt='' className='likeIcon' onClick={likeHandelar} />
          {/* <img src='/assets/heart.png' alt='' className='likeIcon' onClick={likeHandelar} /> */}
          <span className='postLikeCounter'>{like} peple likes it</span>
        </div>
        <div className='postBottomRight'>
          <span className='postCommentText'>{post.comment} comments</span>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Post;
