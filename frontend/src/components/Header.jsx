// import "./style.scss";
import React, { useState, useEffect } from "react";
import pfp from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";

function Header({ userauth, setUserAuth }) {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  function clickHandler(e) {
    if (userauth) {
      const selectedCategory = e.target.innerText;
      if (selectedCategory === "Home") {
        navigate(`/content`);
      } else {
        navigate(`/content/${selectedCategory}`);
      }
    } else {
      navigate('/signin');
    }
  }

  function loginHandler() {
    navigate('/signin');
  }

  function logoutHandler() {
    localStorage.removeItem('token');
    setUserAuth(false);
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
        <span>{`${hours}:${minutes}:${seconds}`}</span>
        <span>{`${day}, ${date} ${month} ${year}`}</span>
        <a href='https://paruluniversity.ac.in/' target='_blank' rel="noopener noreferrer">
          <span>paruluniversity.ac.in</span>
        </a>
      </div>
      <nav className="navbar w-[100%]">
        <div className="w-[85%] flex justify-start gap-8">
        {[
          "Home",
          "Training and Placement",
          // "Career Development",
          "System Support",
          "R and D",
          "Entrepreneurship Development",
        ].map((item, index) => (
          <p key={index} onClick={clickHandler}>
            {item}
          </p>
        ))}
        </div>
        <div className="w-[25%] flex justify-end gap-5">
        {userauth ? (
          <button onClick={logoutHandler} className="text-white font-bold">
            Logout
          </button>
        ) : (
          <button onClick={loginHandler} className="text-white font-bold">
            Login
          </button>
        )}
        <img src={pfp} alt="Profile" className="w-[30px]"/>
        
        </div>
      </nav>
    </div>
  );
}

export default Header;
