import { CircularProgress } from "@mui/material";
import { useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Authcontext } from "../../../context/AuthContext";
import { loginCall } from "../apiCalls";
import "./login.css";

export default function Login() {
  let history = useHistory();
 const email = useRef()
 const password = useRef()
 const {user,isFecthing,error,dispatch} = useContext(Authcontext)
  const handleClick = async (e) => {
    e.preventDefault();
    await loginCall({email:email.current.value,password:password.current.value},dispatch)  
    history.push("/");
  }
  console.log(user);
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
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" className="loginInput" ref={email} />
            <input placeholder="Password" type="password" className="loginInput" ref={password} />
            <button className="loginButton"  disabled={isFecthing}>{isFecthing ? <CircularProgress color="inherit" />  : "Login"}</button>
            <span className="loginForgot">Forgot Password?</span>
           
            <button type="submit" onClick={() => history.push('/register')} className="loginRegisterButton"  disabled={isFecthing}>
            {isFecthing ? <CircularProgress color="inherit" />  : "Create a New Account"}
              
            </button>
          
          </form>
        </div>
      </div>
    </div>
  );
}
