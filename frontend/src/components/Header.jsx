import "./style.scss";
import React, { useState, useEffect } from "react";
import pfp from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";

function Header() {
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  function clickHandler(e) {
    if(e.target.innerText==="Home"){
      navigate(`/content`);
    }
    else{
      const selectedCategory = e.target.innerText;
      setCategory(selectedCategory);
      navigate(`/content/${selectedCategory}`);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  return (
    <div id="Header">
      <div className="logo">
        <p>Parul University's</p>
        <span>PU TIMES</span>
      </div>
      <div className="timeline">
                    <span>{hours}: {minutes}: {seconds}</span>
                    <span>{day}, {date} {month} {year}</span>
                    <a href='https://paruluniversity.ac.in/' target='_blank'><span>paruluniversity.ac.in</span></a>
            </div>
      <nav className="navbar">
        {[
          "Home",
          "Training and Placement",
          // "Armed Forces and Motivation",
          "Career Development",
          // "International Relation",
          "Admission",
          // "Alumni",
          // "Research and Development",
          "System Support",
          //"Technical Event",
          // "Social Responsive",
          "R and D",
          //"Internship",
          "Entrepreneurship Development",
          // "Women Empowerment",
        ].map((item, index) => (
          <p key={index} onClick={clickHandler}>
            {item}
          </p>
        ))}
        <img src={pfp} alt="Profile" />
      </nav>
    </div>
  );
}

export default Header;
