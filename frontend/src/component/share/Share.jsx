import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Authcontext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';




const Share = () => {

  const { user } = useContext(Authcontext);
  const desc = useRef()
  const [file, setFile] = useState('');

  const submitHandler = async(e) => {
    e.preventDefault()

   const newPost = {
    userId: user._id,
    desc: desc.current.value
   }



   if (file) {
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    newPost.img = fileName;
    console.log(newPost);
    try {
      await axios.post("http://localhost:8800/api/upload", data);
    } catch (err) {
      console.log(err);
    }
  }
 
   try {
    await axios.post(`http://localhost:8800/api/posts`,newPost)
     
      window.location.reload();
   } catch (error) {
     console.log(error);
   }
  }
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img src='/assets/person/1.jpeg' alt='' className='shareProfilePic' />
          <input
            type='text'
            placeholder={"Write your post " + user.username + " ?"}
            className='shareInput' ref={desc}
          />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className='shareBotton' onSubmit={submitHandler} encType='multipart/form-data'>
        <div className='shareOptions'>
            <label htmlFor="file"  className='shareOption'>
              <PermMediaIcon htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo or Video</span>
              <input style={{display:"none"}} type="file" id="file" accept=".png, .bmp, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} />
            </label >
            <div className='shareOption'>
              <LabelIcon
                htmlColor='#2979ff
'
                className='shareIcon'
              />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <RoomIcon
                htmlColor='#00e676
'
                className='shareIcon'
              />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotionsIcon htmlColor='#ffcf33' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
            <button className='shareButton' type="submit">
              
              
               Share </button>

            
          </div>
        </form>




      </div>
    </div>
  );
};

export default Share;
