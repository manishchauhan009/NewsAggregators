import React from "react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './style.scss';
import urls from "../Url";


function Signin({ setUserAuth, currentuser, setCurrentEmail, setCurrentUser }) {
  // const [typeuser, settypeuser] = useState("");
  let history = useNavigate();
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const Navigate = useNavigate();

  const Signup = () => {
    Navigate("/signup");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urls.userUrl}/login`, {
        Email,
        Username,
        Password,
      });

      setCurrentUser(Username);
      setCurrentEmail(Email);
      console.log(response);
      console.log(response.data);

      if (response.status === 200) {
        toast.success("Found You!!");
        localStorage.setItem('token',response.data.token);
        setUserAuth(true)
        setTimeout(() => {
          toast.dismiss();
          if (Email==="admin@gmail.com"){
            history("/Admin")
            return
          }
          history("/content");
        }, 2000);
        toast.loading("Will Redirect");
      } else if (response.status === 404) {
        toast.error("Account Doesn't Exists With Us..!!");
        setTimeout(() => {
          history('/signup')
        }, 2000);
        toast.loading("Will Redirect..");
      }
      else {
        toast.error("Credentials are Not Matching!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        toast.loading("Will Referesh");
      }
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  return (
    <div id="Signin">
      <Toaster />
      <div className="content">
        <h1 className="">Sign in</h1>
        <form onSubmit={submitHandler} action="">
          {<label>Email
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Your Email"
              className=""
              type="text"
            />
          </label>}
          {<label>Username
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter Your Username"
              className=""
              type="text"
            />
          </label>}
          {<label>Password
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Your Password"
              className=""
              type="password"
            />
          </label>}
          <button className="">
            Sign in
          </button>
        </form>
        <div className="line"></div>
        <div className="registration">
          <button onClick={Signup} className="">Register</button>
        </div>
      </div>
      <div className="img-container">
        <img src='https://i.pinimg.com/originals/48/5d/2f/485d2f9046e9042762da35b2e8f22b87.gif' />
      </div>
    </div>
  );
}

export default Signin;
