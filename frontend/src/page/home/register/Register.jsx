import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";

export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const history = useHistory()
  const handleClick = async (e) => {
    e.preventDefault();
    if(confirmPassword.current.value !== password.current.value){
      password.current.setCustomValidity("Passowrd doesn't match!")
    }else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try {
     await axios.post("http://localhost:8800/api/auth/register",user);
        history.push("/login")
      } catch (error) {
        console.log(error);
      }
    }

    //loginCall({email:email.current.value,password:password.current.value},dispatch)  
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">AKSITE</h3>
          <span className="loginDesc">
            Connect your friend with AKSITE.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input placeholder="Username" className="loginInput"  ref={username} />
            <input placeholder="Email" type="email" className="loginInput"  ref={email} />
            <input placeholder="Password" type="password" className="loginInput" ref={password} />
            <input placeholder="Password Again" type="password" className="loginInput" ref={confirmPassword} />
            <button className="loginButton">Sign Up</button>
            <button type="submit" className="loginRegisterButton">
              Log into Account
            </button>
          </form >
        </div>
      </div>
    </div>
  );
}
