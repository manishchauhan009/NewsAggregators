import React from 'react'
import { useNavigate} from "react-router-dom";
import "./style.scss";
import sticker from "../assets/sticker.svg";
const RegisterBlock=()=>{
  let history=useNavigate();
    const Loginclick=()=>{
        history('/signin')
    }
  return(
    <div className="RegisterBlock">
      <div>
        <h1>Make Headlines: Join & Write!</h1>
        <p className='small-content'>We are always open to take you in</p>
        <p className='quote'>Transform campus conversations. Write your truth, share widely, and lead change at your university</p>
      </div>
      <button onClick={Loginclick}>
        <img src={sticker}/>
        Register NOWWW!!
      </button>
      

    </div>
  )
}
function Front() {
  return (
    <div className='Front'>
      <RegisterBlock/>
  </div>
  )
}

export default Front