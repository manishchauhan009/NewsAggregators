import React from 'react'
import { useNavigate} from "react-router-dom";

function Front() {
    let history=useNavigate();
    const Loginclick=()=>{
        history('/signin')
    }
  return (
    <div id='me' className='h-screen flex flex-col'>
    <div className='flex justify-center items-center'><p onClick={Loginclick} className='cursor-pointer'>SIGN-IN</p></div>
    <div className='h-full flex items-center justify-center w-full'>
    </div>
    
  </div>
  )
}

export default Front