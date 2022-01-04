import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../context/AuthContext";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";


const Feed = ({ username }) => {
const { user } = useContext(Authcontext);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(
            "http://localhost:8800/api/posts/profile/"+username
          )
        : await axios.get(
            "http://localhost:8800/api/posts/timeline/" + user._id
          );
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    };
    fetchPost();
  }, [username, user._id]);
  return (
    <div className='feed'>
      <div className='feedWraper'>

       { (!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
