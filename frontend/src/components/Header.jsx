// import "./style.scss";
import React, { useState, useEffect } from "react";
import pfp from "../assets/profile.svg";

import { useNavigate } from "react-router-dom";

function Header({ userauth, setUserAuth,setCurrentEmail }) {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  function clickHandler(e) {
      const selectedCategory = e.target.innerText;
      if (selectedCategory === "Home") {
        navigate(`/`);
      } else {
        navigate(`/content/${selectedCategory}`);
      
    } 
  }

  function loginHandler() {
    navigate('/signin');
  }

  function logoutHandler() {
    localStorage.removeItem('token');
    setUserAuth(false);
    setCurrentEmail("");
    navigate('/signin');
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"
  ];
  const year = time.getFullYear();
  const month = months[time.getMonth()];
  const day = days[time.getDay()];
  const date = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  const items = [
    'Home','General', 'Training and Placement', 'System Support', 
    'Entrepreneurship Development','Research and Development', 'Career Development', 'Admission', 'Social responsive',
    'International relations', 'Women Empowerment', 'Technical Events', 'Alumni'
  ];

  const [first5Items] = useState(items.slice(0, 5));
  const [remainingItems] = useState(items.slice(5));
  
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);

  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

  return (
    <div id="Header">
      <div className="logo">
        <p>Parul University's</p>
        <span>PU TIMES</span>
      </div>
      <div className="timeline">
        <span>{`${day}, ${date} ${month} ${year}`}</span>
        <span>{`${hours}:${minutes}:${seconds}`}</span>
        <a href='https://paruluniversity.ac.in/' target='_blank' rel="noopener noreferrer">
          <span>paruluniversity.ac.in</span>
        </a>
      </div>
      <nav className="navbar">
        {first5Items.map((item, index) => (
          <p key={index} onClick={clickHandler} className="nav-item">
            {item}
          </p>
        ))}
        <p className="more">More
          <div className="dropdown">
          {remainingItems.map((item, index) => (
                <p key={index} className="dropdown-item" onClick={clickHandler}>{item}</p>
              ))}
          </div>
        </p>
        <div className="profile-container">
          <div className="login-controls">
            {userauth ? (
              <button onClick={logoutHandler} className="">
                Logout
              </button>
            ) : (
              <button onClick={loginHandler} className="">
                Login
              </button>
            )}
          </div>
          <img onClick={()=>{
            navigate("/content")
          }} src={pfp} alt="Profile" className="" title="go to profile"/>
        </div>
        
        
      </nav>
    </div>
  );
}

export default Header;
